
using System.ComponentModel.DataAnnotations;

namespace worco_backend.Models
{
    public class CompanyRegistration
    {
        [Required(ErrorMessage = "��������� ������ E-mail")]
        [EmailAddress(ErrorMessage = "�������� E-mail")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "��������� ������ ����� ��������")]
        [DataType(DataType.PhoneNumber)]
        public string? Phone { get; set; }

        [Required(ErrorMessage = "��������� ������ �������� �����������")]
        public string? CompanyName { get; set; }

        [Required(ErrorMessage = "��������� ������ ��� �����������")]
        public string? Inn { get; set; }

        [Required(ErrorMessage = "��������� ������ ��� �����������")]
        public string? TypeOfOrganization { get; set; }

        [Required(ErrorMessage = "��������� ������ ������")]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

    }
}