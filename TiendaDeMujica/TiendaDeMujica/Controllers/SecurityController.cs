using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using NLog;
using NLog.Web;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TiendaDeMujica.Lib;
using TiendaDeMujica.Models;
using TiendaDeMujica.Models.ViewModels;

namespace TiendaDeMujica.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        Logger logger;

        public SecurityController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
        }

        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] CreateUserModel createUserModel)
        {
            try
            {
                string resultVal = Validator(createUserModel);
                if (resultVal != "Ok")
                    return StatusCode(400, resultVal);


                var result = await _userManager.CreateAsync(new User
                {
                    Name = createUserModel.Name,
                    Email = createUserModel.Email,
                    UserName = createUserModel.UserName,
                    PhoneNumber = createUserModel.PhoneNumber,
                }, createUserModel.Password);

                if (!result.Succeeded)
                {
                    return StatusCode(500, string.Format("{0}, {1}",result.Errors.First().Code, result.Errors.First().Description));
                }

                return Ok("Usuario creado exitosamente");
            }
            catch (Exception e)
            {
                logger.Error(e);
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            try
            {
                // 1. Revisar que  el username / email exista en la base de datos
                User user = await _userManager.FindByNameAsync(loginModel.UserName);
                if (user != null)
                {
                    // 2. Verificar que la contraseña corresponde a la del usuario
                    var passwordCheck = await _signInManager.CheckPasswordSignInAsync(user, loginModel.Password, false);
                    if (passwordCheck.Succeeded)
                    {
                        // 3. Generar un token de identificación para ese usuario
                        var key = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("SecretKey"));

                        var claims = new[]
                        {
                            new Claim("IDUser", user.Id),
                            new Claim("Username", user.UserName)
                        };
                        var identityClaim = new ClaimsIdentity(claims);

                        var tokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = identityClaim,
                            Expires = DateTime.UtcNow.AddDays(1),
                            SigningCredentials = new SigningCredentials(
                                new SymmetricSecurityKey(key),
                                SecurityAlgorithms.HmacSha256Signature
                                )
                        };

                        var tokenHandler = new JwtSecurityTokenHandler();

                        var createdToken = tokenHandler.CreateToken(tokenDescriptor);

                        return Ok(tokenHandler.WriteToken(createdToken));
                    }
                    else
                    {
                        return StatusCode(404, "Usuario o  contraseña invalidos");
                    }
                }


                return StatusCode(404, "El usuario no existe");
            }
            catch (Exception e)
            {
                logger.Error(e);
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }


        private string Validator(CreateUserModel User)
        {
            Validate validate = new Validate();

            if(!validate.ValidateEmpty(User))
            {
                return "Llena todos los campos";
            }

            if (!validate.IsValidEmail(User.Email))
            {
                return "Ingrese un email valido";
            }

            if(!validate.IsValidLength(User.Password,4))
            {
                return "Ingrese una contraseña mayor a 4 caracteres";
            }

            if (!validate.IsValidPhoneNumber(User.PhoneNumber))
            {
                return "Ingrese un número telefónico de 10 caracteres";
            }

            return "Ok";
        }
    }
}
