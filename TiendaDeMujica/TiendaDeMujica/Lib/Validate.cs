using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TiendaDeMujica.Models.ViewModels;

namespace TiendaDeMujica.Lib
{
    public class Validate
    {
        public bool ValidateEmpty(CreateUserModel User)
        {
            if (string.IsNullOrEmpty(User.Name) || string.IsNullOrEmpty(User.Email) || string.IsNullOrEmpty(User.Password) || string.IsNullOrEmpty(User.UserName))
            {
                return false;
            }
            return true;
        }

        public bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                // Normalize the domain
                email = Regex.Replace(email, @"(@)(.+)$", DomainMapper,
                                      RegexOptions.None, TimeSpan.FromMilliseconds(200));

                // Examines the domain part of the email and normalizes it.
                string DomainMapper(Match match)
                {
                    // Use IdnMapping class to convert Unicode domain names.
                    var idn = new IdnMapping();

                    // Pull out and process domain name (throws ArgumentException on invalid)
                    string domainName = idn.GetAscii(match.Groups[2].Value);

                    return match.Groups[1].Value + domainName;
                }
            }
            catch (RegexMatchTimeoutException e)
            {
                return false;
            }
            catch (ArgumentException e)
            {
                return false;
            }

            try
            {
                return Regex.IsMatch(email,
                    @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }

        public bool IsValidLength(string str, int number)
        {
            if(str.Length>=number)
            {
                return true;
            }
            return false;
        }

        public bool IsValidPhoneNumber(string phoneNumber)
        {
            if(string.IsNullOrEmpty(phoneNumber))
            {
                return true;
            }

            if (phoneNumber.Length == 10)
            {
                return true;
            }

            return false;
        }
    }
}
