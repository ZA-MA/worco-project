using System.Security.Cryptography;
using System.Text;

namespace worco_backend.Auth
{
    public class HashHelper
    {
        public static string hashPassword(string pass)
        {
            MD5 mD5 = MD5.Create();

            byte[] b = Encoding.ASCII.GetBytes(pass);
            byte[] hash = mD5.ComputeHash(b);

            StringBuilder sb = new StringBuilder();
            foreach (var a in  hash)
            {
                sb.Append(a.ToString("X2"));
            }

            return Convert.ToString(sb);
        }
    }
}
