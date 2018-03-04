using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace fso.Data.Migrations
{
    public partial class GroupRelMigz : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GroupRelation",
                columns: table => new
                {
                    ParentGroupId = table.Column<int>(nullable: false),
                    ChildGroupId = table.Column<int>(nullable: false),
                    DominateValue = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupRelation", x => new { x.ParentGroupId, x.ChildGroupId });
                    table.ForeignKey(
                        name: "FK_GroupRelation_Group_ChildGroupId",
                        column: x => x.ChildGroupId,
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GroupRelation_Group_ParentGroupId",
                        column: x => x.ParentGroupId,
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupRelation_ChildGroupId",
                table: "GroupRelation",
                column: "ChildGroupId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupRelation");
        }
    }
}
