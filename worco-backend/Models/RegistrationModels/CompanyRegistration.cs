
using System.ComponentModel.DataAnnotations;

namespace worco_backend.Models
{
    public class CompanyRegistration
    {
        [Required(ErrorMessage = "Требуется ввести E-mail")]
        [EmailAddress(ErrorMessage = "Неверный E-mail")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Требуется ввести номер телефона")]
        [DataType(DataType.PhoneNumber)]
        public string? Phone { get; set; }

        [Required(ErrorMessage = "Требуется ввести название организации")]
        public string? CompanyName { get; set; }

        [Required(ErrorMessage = "Требуется ввести ИНН организации")]
        public string? Inn { get; set; }

        [Required(ErrorMessage = "Требуется ввести тип организации")]
        public string? TypeOfOrganization { get; set; }

        [Required(ErrorMessage = "Требуется ввести пароль")]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

    }
}