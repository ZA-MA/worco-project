﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using worco_backend.Data;

#nullable disable

namespace worcobackend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240301122919_DBInit3")]
    partial class DBInit3
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("worco_backend.Models.Account", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("id"));

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("firstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("in_company")
                        .HasColumnType("boolean");

                    b.Property<string>("lastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("login_id")
                        .HasColumnType("integer");

                    b.Property<string>("patronymic")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("role_id")
                        .HasColumnType("integer");

                    b.HasKey("id");

                    b.HasIndex("login_id");

                    b.HasIndex("role_id");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("worco_backend.Models.Element", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("id"));

                    b.Property<int>("height")
                        .HasColumnType("integer");

                    b.Property<string>("image")
                        .HasColumnType("text");

                    b.Property<int>("indicator_size")
                        .HasColumnType("integer");

                    b.Property<float>("indicator_x")
                        .HasColumnType("real");

                    b.Property<float>("indicator_y")
                        .HasColumnType("real");

                    b.Property<bool>("only_indicator")
                        .HasColumnType("boolean");

                    b.Property<string>("options")
                        .HasColumnType("text");

                    b.Property<string>("type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("width")
                        .HasColumnType("integer");

                    b.HasKey("id");

                    b.ToTable("Elements");
                });

            modelBuilder.Entity("worco_backend.Models.Login", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("id"));

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("id");

                    b.ToTable("Login");
                });

            modelBuilder.Entity("worco_backend.Models.Map", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("id"));

                    b.Property<bool>("activity")
                        .HasColumnType("boolean");

                    b.Property<int>("height")
                        .HasColumnType("integer");

                    b.Property<string>("image")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("width")
                        .HasColumnType("integer");

                    b.HasKey("id");

                    b.ToTable("Maps");
                });

            modelBuilder.Entity("worco_backend.Models.Place", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("id"));

                    b.Property<bool>("can_bron")
                        .HasColumnType("boolean");

                    b.Property<int>("element_id")
                        .HasColumnType("integer");

                    b.Property<int>("map_id")
                        .HasColumnType("integer");

                    b.Property<int>("number_place")
                        .HasColumnType("integer");

                    b.Property<string>("options")
                        .HasColumnType("text");

                    b.Property<int>("price")
                        .HasColumnType("integer");

                    b.Property<bool>("visible")
                        .HasColumnType("boolean");

                    b.Property<float>("x")
                        .HasColumnType("real");

                    b.Property<float>("y")
                        .HasColumnType("real");

                    b.HasKey("id");

                    b.HasIndex("element_id");

                    b.HasIndex("map_id");

                    b.ToTable("Places");
                });

            modelBuilder.Entity("worco_backend.Models.ReservationsPlaces", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("id"));

                    b.Property<int?>("account_id")
                        .HasColumnType("integer");

                    b.Property<DateTime>("end_datetime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("is_delete_place")
                        .HasColumnType("boolean");

                    b.Property<bool>("is_paid")
                        .HasColumnType("boolean");

                    b.Property<string>("name_map")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("place_id")
                        .HasColumnType("integer");

                    b.Property<int>("place_number")
                        .HasColumnType("integer");

                    b.Property<int>("price")
                        .HasColumnType("integer");

                    b.Property<DateTime>("start_datetime")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("id");

                    b.HasIndex("account_id");

                    b.HasIndex("place_id");

                    b.ToTable("ReservationsPlaces");
                });

            modelBuilder.Entity("worco_backend.Models.Role", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("id"));

                    b.Property<string>("role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("worco_backend.Models.Account", b =>
                {
                    b.HasOne("worco_backend.Models.Login", "login")
                        .WithMany()
                        .HasForeignKey("login_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("worco_backend.Models.Role", "role")
                        .WithMany()
                        .HasForeignKey("role_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("login");

                    b.Navigation("role");
                });

            modelBuilder.Entity("worco_backend.Models.Place", b =>
                {
                    b.HasOne("worco_backend.Models.Element", "element")
                        .WithMany("places")
                        .HasForeignKey("element_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("worco_backend.Models.Map", "map")
                        .WithMany("places")
                        .HasForeignKey("map_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("element");

                    b.Navigation("map");
                });

            modelBuilder.Entity("worco_backend.Models.ReservationsPlaces", b =>
                {
                    b.HasOne("worco_backend.Models.Account", "account")
                        .WithMany("reservationsPlaces")
                        .HasForeignKey("account_id");

                    b.HasOne("worco_backend.Models.Place", "place")
                        .WithMany("reservationsPlaces")
                        .HasForeignKey("place_id");

                    b.Navigation("account");

                    b.Navigation("place");
                });

            modelBuilder.Entity("worco_backend.Models.Account", b =>
                {
                    b.Navigation("reservationsPlaces");
                });

            modelBuilder.Entity("worco_backend.Models.Element", b =>
                {
                    b.Navigation("places");
                });

            modelBuilder.Entity("worco_backend.Models.Map", b =>
                {
                    b.Navigation("places");
                });

            modelBuilder.Entity("worco_backend.Models.Place", b =>
                {
                    b.Navigation("reservationsPlaces");
                });
#pragma warning restore 612, 618
        }
    }
}
