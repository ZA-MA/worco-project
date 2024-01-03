using Microsoft.AspNetCore.Authorization;
using worco_backend.Models;

namespace worco_backend.Auth
{
    public class AuthorizeRolesAttribute : AuthorizeAttribute
{
    public AuthorizeRolesAttribute(params string[] roles) : base()
    {
        Roles = string.Join(",", roles);
    }
}
}
