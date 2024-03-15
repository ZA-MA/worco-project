using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace worcobackend.Migrations
{
    /// <inheritdoc />
    public partial class DBInit4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationsPlaces_Accounts_account_id",
                table: "ReservationsPlaces");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.AddColumn<int>(
                name: "Companyid",
                table: "ReservationsPlaces",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    login_id = table.Column<int>(type: "integer", nullable: false),
                    role_id = table.Column<int>(type: "integer", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    phone = table.Column<string>(type: "text", nullable: false),
                    name_company = table.Column<string>(type: "text", nullable: false),
                    inn = table.Column<string>(type: "text", nullable: false),
                    type_company = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.id);
                    table.ForeignKey(
                        name: "FK_Companies_Login_login_id",
                        column: x => x.login_id,
                        principalTable: "Login",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Companies_Roles_role_id",
                        column: x => x.role_id,
                        principalTable: "Roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    login_id = table.Column<int>(type: "integer", nullable: false),
                    role_id = table.Column<int>(type: "integer", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    firstName = table.Column<string>(type: "text", nullable: false),
                    lastName = table.Column<string>(type: "text", nullable: false),
                    patronymic = table.Column<string>(type: "text", nullable: false),
                    phone = table.Column<string>(type: "text", nullable: false),
                    in_company = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                    table.ForeignKey(
                        name: "FK_Users_Login_login_id",
                        column: x => x.login_id,
                        principalTable: "Login",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Users_Roles_role_id",
                        column: x => x.role_id,
                        principalTable: "Roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservationsPlaces_Companyid",
                table: "ReservationsPlaces",
                column: "Companyid");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_login_id",
                table: "Companies",
                column: "login_id");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_role_id",
                table: "Companies",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "IX_Users_login_id",
                table: "Users",
                column: "login_id");

            migrationBuilder.CreateIndex(
                name: "IX_Users_role_id",
                table: "Users",
                column: "role_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationsPlaces_Companies_Companyid",
                table: "ReservationsPlaces",
                column: "Companyid",
                principalTable: "Companies",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationsPlaces_Users_account_id",
                table: "ReservationsPlaces",
                column: "account_id",
                principalTable: "Users",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationsPlaces_Companies_Companyid",
                table: "ReservationsPlaces");

            migrationBuilder.DropForeignKey(
                name: "FK_ReservationsPlaces_Users_account_id",
                table: "ReservationsPlaces");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_ReservationsPlaces_Companyid",
                table: "ReservationsPlaces");

            migrationBuilder.DropColumn(
                name: "Companyid",
                table: "ReservationsPlaces");

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    login_id = table.Column<int>(type: "integer", nullable: false),
                    role_id = table.Column<int>(type: "integer", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    firstName = table.Column<string>(type: "text", nullable: false),
                    in_company = table.Column<bool>(type: "boolean", nullable: false),
                    lastName = table.Column<string>(type: "text", nullable: false),
                    patronymic = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.id);
                    table.ForeignKey(
                        name: "FK_Accounts_Login_login_id",
                        column: x => x.login_id,
                        principalTable: "Login",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Accounts_Roles_role_id",
                        column: x => x.role_id,
                        principalTable: "Roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_login_id",
                table: "Accounts",
                column: "login_id");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_role_id",
                table: "Accounts",
                column: "role_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationsPlaces_Accounts_account_id",
                table: "ReservationsPlaces",
                column: "account_id",
                principalTable: "Accounts",
                principalColumn: "id");
        }
    }
}
