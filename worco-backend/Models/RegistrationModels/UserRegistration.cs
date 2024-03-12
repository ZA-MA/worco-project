
using System.ComponentModel.DataAnnotations;

namespace worco_backend.Models
{
    public class UserRegistration
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Patronymic { get; set; }

        [Required(ErrorMessage = "��������� ������ E-mail")]
        [EmailAddress(ErrorMessage = "�������� E-mail")]
        public string Email { get; set; }

        [Required(ErrorMessage = "��������� ������ ����� ��������")]
        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        [Required(ErrorMessage = "��������� ������ ������")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

    }
}