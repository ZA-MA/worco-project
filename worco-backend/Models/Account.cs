﻿using Microsoft.AspNetCore.Identity;

namespace worco_backend.Models
{
    public class Account
    {
        public int id { get; set; }
        public int login_id { get; set; }
        public int role_id { get; set; }
        
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string patronymic { get; set; }
        public bool in_company { get; set; }
        public Login login { get; set; }
        public Role role { get; set; }
    }
}
