using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace fso.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Group",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    About = table.Column<string>(maxLength: 1024, nullable: true),
                    ColorAlpha = table.Column<string>(maxLength: 256, nullable: true),
                    DateUtcAdd = table.Column<DateTime>(nullable: false),
                    DateUtcModified = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(maxLength: 256, nullable: true),
                    IsSoftDeleted = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    UrlKey = table.Column<string>(maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Group", x => x.Id);
                    table.UniqueConstraint("AK_Group_UrlKey", x => x.UrlKey);
                });

            migrationBuilder.CreateTable(
                name: "UserActivity",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AppUserId = table.Column<string>(maxLength: 64, nullable: true),
                    DateUtcAdd = table.Column<DateTime>(nullable: false),
                    DateUtcModified = table.Column<DateTime>(nullable: false),
                    FeedType = table.Column<int>(nullable: false),
                    IsSoftDeleted = table.Column<bool>(nullable: false),
                    ParentEntityId = table.Column<int>(nullable: true),
                    ParentEntityType = table.Column<int>(nullable: false),
                    SourceEntityId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserActivity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserInfo",
                columns: table => new
                {
                    AppUserId = table.Column<string>(maxLength: 64, nullable: false),
                    AlphaColor = table.Column<string>(maxLength: 32, nullable: true),
                    DateUtcAdd = table.Column<DateTime>(nullable: false),
                    DateUtcModified = table.Column<DateTime>(nullable: false),
                    FollowSetting = table.Column<int>(nullable: false),
                    Id = table.Column<int>(nullable: false),
                    IsSoftDeleted = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(maxLength: 128, nullable: true),
                    PrivacySetting = table.Column<int>(nullable: false),
                    ProfilePictureId = table.Column<int>(nullable: true),
                    Status = table.Column<string>(maxLength: 512, nullable: true),
                    Surname = table.Column<string>(maxLength: 128, nullable: true),
                    UName = table.Column<string>(maxLength: 64, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserInfo", x => x.AppUserId);
                });

            migrationBuilder.CreateTable(
                name: "FollowInfo",
                columns: table => new
                {
                    FollowedId = table.Column<string>(nullable: false),
                    FollowerId = table.Column<string>(nullable: false),
                    DateUtcFollowed = table.Column<DateTime>(nullable: false),
                    FollowState = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FollowInfo", x => new { x.FollowedId, x.FollowerId });
                    table.ForeignKey(
                        name: "FK_FollowInfo_UserInfo_FollowedId",
                        column: x => x.FollowedId,
                        principalTable: "UserInfo",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FollowInfo_UserInfo_FollowerId",
                        column: x => x.FollowerId,
                        principalTable: "UserInfo",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PostCollection",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateUtcAdd = table.Column<DateTime>(nullable: false),
                    DateUtcModified = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(maxLength: 320, nullable: true),
                    IsSoftDeleted = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: true),
                    PrivacyStatus = table.Column<int>(nullable: false),
                    ThumbFileId = table.Column<int>(nullable: true),
                    UserInfoId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostCollection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostCollection_UserInfo_UserInfoId",
                        column: x => x.UserInfoId,
                        principalTable: "UserInfo",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserGroup",
                columns: table => new
                {
                    GroupId = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    DateUtcFollowed = table.Column<DateTime>(nullable: false),
                    GroupFollowState = table.Column<int>(nullable: false),
                    UserReputationInGroup = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroup", x => new { x.GroupId, x.UserId });
                    table.ForeignKey(
                        name: "FK_UserGroup_Group_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserGroup_UserInfo_UserId",
                        column: x => x.UserId,
                        principalTable: "UserInfo",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CollectionId = table.Column<int>(nullable: true),
                    Content = table.Column<string>(maxLength: 5012, nullable: true),
                    DateUtcAdd = table.Column<DateTime>(nullable: false),
                    DateUtcModified = table.Column<DateTime>(nullable: false),
                    DateUtcPublished = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(maxLength: 2048, nullable: true),
                    IsPublished = table.Column<bool>(nullable: false),
                    IsSoftDeleted = table.Column<bool>(nullable: false),
                    PrivacyStatus = table.Column<int>(nullable: false),
                    Rating = table.Column<double>(nullable: true),
                    Title = table.Column<string>(maxLength: 256, nullable: true),
                    UserInfoId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Post_PostCollection_CollectionId",
                        column: x => x.CollectionId,
                        principalTable: "PostCollection",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Post_UserInfo_UserInfoId",
                        column: x => x.UserInfoId,
                        principalTable: "UserInfo",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "GroupPost",
                columns: table => new
                {
                    GroupId = table.Column<int>(nullable: false),
                    PostId = table.Column<int>(nullable: false),
                    DateUtcAdded = table.Column<DateTime>(nullable: false),
                    PostPopularityLevel = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupPost", x => new { x.GroupId, x.PostId });
                    table.ForeignKey(
                        name: "FK_GroupPost_Group_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupPost_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Popularity",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CultureCode = table.Column<string>(nullable: true),
                    DateUtcAdd = table.Column<DateTime>(nullable: false),
                    DateUtcModified = table.Column<DateTime>(nullable: false),
                    GroupId = table.Column<int>(nullable: true),
                    IsSoftDeleted = table.Column<bool>(nullable: false),
                    OnTrendingEndUtcTime = table.Column<DateTime>(nullable: false),
                    OnTrendingStartUtcTime = table.Column<DateTime>(nullable: false),
                    PopularityLevel = table.Column<int>(nullable: false),
                    PostId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Popularity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Popularity_Group_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Popularity_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PostPart",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateUtcAdd = table.Column<DateTime>(nullable: false),
                    DateUtcModified = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    ImageId = table.Column<int>(nullable: true),
                    IsSoftDeleted = table.Column<bool>(nullable: false),
                    PostId = table.Column<int>(nullable: true),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostPart", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostPart_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(maxLength: 10126, nullable: true),
                    DateUtcAdd = table.Column<DateTime>(nullable: false),
                    DateUtcModified = table.Column<DateTime>(nullable: false),
                    DateUtcPublished = table.Column<DateTime>(nullable: false),
                    IsSoftDeleted = table.Column<bool>(nullable: false),
                    PostId = table.Column<int>(nullable: true),
                    PostRate = table.Column<double>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    UserReputation = table.Column<double>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Review_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Review_UserInfo_UserId",
                        column: x => x.UserId,
                        principalTable: "UserInfo",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "UserPostLike",
                columns: table => new
                {
                    PostId = table.Column<int>(nullable: false),
                    UserInfoId = table.Column<string>(nullable: false),
                    DateUtcLiked = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPostLike", x => new { x.PostId, x.UserInfoId });
                    table.ForeignKey(
                        name: "FK_UserPostLike_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserPostLike_UserInfo_UserInfoId",
                        column: x => x.UserInfoId,
                        principalTable: "UserInfo",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppMediaFile",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BlurLazyPath = table.Column<string>(maxLength: 1024, nullable: true),
                    CoverGroupId = table.Column<int>(nullable: true),
                    DateUtcAdd = table.Column<DateTime>(nullable: false),
                    DateUtcModified = table.Column<DateTime>(nullable: false),
                    FileExtension = table.Column<string>(maxLength: 16, nullable: true),
                    ImageDimension = table.Column<string>(maxLength: 16, nullable: true),
                    IsSoftDeleted = table.Column<bool>(nullable: false),
                    Path = table.Column<string>(maxLength: 1024, nullable: true),
                    PostCollectionId = table.Column<int>(nullable: true),
                    PostPartId = table.Column<int>(nullable: true),
                    ProfileGroupId = table.Column<int>(nullable: true),
                    ResizedPath = table.Column<string>(maxLength: 1024, nullable: true),
                    SmallPath = table.Column<string>(maxLength: 1024, nullable: true),
                    ThumbPath = table.Column<string>(maxLength: 1024, nullable: true),
                    UserInfoId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppMediaFile", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppMediaFile_Group_CoverGroupId",
                        column: x => x.CoverGroupId,
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppMediaFile_PostCollection_PostCollectionId",
                        column: x => x.PostCollectionId,
                        principalTable: "PostCollection",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppMediaFile_PostPart_PostPartId",
                        column: x => x.PostPartId,
                        principalTable: "PostPart",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_AppMediaFile_Group_ProfileGroupId",
                        column: x => x.ProfileGroupId,
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppMediaFile_UserInfo_UserInfoId",
                        column: x => x.UserInfoId,
                        principalTable: "UserInfo",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AuthorId = table.Column<string>(nullable: true),
                    Content = table.Column<string>(maxLength: 1024, nullable: true),
                    DateUtcAdd = table.Column<DateTime>(nullable: false),
                    DateUtcModified = table.Column<DateTime>(nullable: false),
                    IsSoftDeleted = table.Column<bool>(nullable: false),
                    ParentCommentId = table.Column<int>(nullable: true),
                    ReviewId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comment_UserInfo_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "UserInfo",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Comment_Review_ReviewId",
                        column: x => x.ReviewId,
                        principalTable: "Review",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "ReputationGain",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateUtcAdd = table.Column<DateTime>(nullable: false),
                    DateUtcModified = table.Column<DateTime>(nullable: false),
                    GainedReputationValue = table.Column<double>(nullable: false),
                    IsSoftDeleted = table.Column<bool>(nullable: false),
                    PostId = table.Column<int>(nullable: true),
                    ReviewId = table.Column<int>(nullable: true),
                    UserInfoId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReputationGain", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReputationGain_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReputationGain_Review_ReviewId",
                        column: x => x.ReviewId,
                        principalTable: "Review",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReputationGain_UserInfo_UserInfoId",
                        column: x => x.UserInfoId,
                        principalTable: "UserInfo",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserReview",
                columns: table => new
                {
                    ReviewId = table.Column<int>(nullable: false),
                    UserInfoId = table.Column<string>(nullable: false),
                    DateUtcModified = table.Column<DateTime>(nullable: false),
                    LikeStatus = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserReview", x => new { x.ReviewId, x.UserInfoId });
                    table.ForeignKey(
                        name: "FK_UserReview_Review_ReviewId",
                        column: x => x.ReviewId,
                        principalTable: "Review",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserReview_UserInfo_UserInfoId",
                        column: x => x.UserInfoId,
                        principalTable: "UserInfo",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CommentUser",
                columns: table => new
                {
                    CommentId = table.Column<int>(nullable: false),
                    UserInfoId = table.Column<string>(nullable: false),
                    LikeStatus = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentUser", x => new { x.CommentId, x.UserInfoId });
                    table.ForeignKey(
                        name: "FK_CommentUser_Comment_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CommentUser_UserInfo_UserInfoId",
                        column: x => x.UserInfoId,
                        principalTable: "UserInfo",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppMediaFile_CoverGroupId",
                table: "AppMediaFile",
                column: "CoverGroupId",
                unique: true,
                filter: "[CoverGroupId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AppMediaFile_PostCollectionId",
                table: "AppMediaFile",
                column: "PostCollectionId",
                unique: true,
                filter: "[PostCollectionId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AppMediaFile_PostPartId",
                table: "AppMediaFile",
                column: "PostPartId",
                unique: true,
                filter: "[PostPartId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AppMediaFile_ProfileGroupId",
                table: "AppMediaFile",
                column: "ProfileGroupId",
                unique: true,
                filter: "[ProfileGroupId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AppMediaFile_UserInfoId",
                table: "AppMediaFile",
                column: "UserInfoId",
                unique: true,
                filter: "[UserInfoId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_AuthorId",
                table: "Comment",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_ReviewId",
                table: "Comment",
                column: "ReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentUser_UserInfoId",
                table: "CommentUser",
                column: "UserInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_FollowInfo_FollowerId",
                table: "FollowInfo",
                column: "FollowerId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupPost_PostId",
                table: "GroupPost",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Popularity_GroupId",
                table: "Popularity",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Popularity_PostId",
                table: "Popularity",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_CollectionId",
                table: "Post",
                column: "CollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_UserInfoId",
                table: "Post",
                column: "UserInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_PostCollection_UserInfoId",
                table: "PostCollection",
                column: "UserInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_PostPart_PostId",
                table: "PostPart",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_ReputationGain_PostId",
                table: "ReputationGain",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_ReputationGain_ReviewId",
                table: "ReputationGain",
                column: "ReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_ReputationGain_UserInfoId",
                table: "ReputationGain",
                column: "UserInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_Review_PostId",
                table: "Review",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Review_UserId",
                table: "Review",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroup_UserId",
                table: "UserGroup",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserPostLike_UserInfoId",
                table: "UserPostLike",
                column: "UserInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_UserReview_UserInfoId",
                table: "UserReview",
                column: "UserInfoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppMediaFile");

            migrationBuilder.DropTable(
                name: "CommentUser");

            migrationBuilder.DropTable(
                name: "FollowInfo");

            migrationBuilder.DropTable(
                name: "GroupPost");

            migrationBuilder.DropTable(
                name: "Popularity");

            migrationBuilder.DropTable(
                name: "ReputationGain");

            migrationBuilder.DropTable(
                name: "UserActivity");

            migrationBuilder.DropTable(
                name: "UserGroup");

            migrationBuilder.DropTable(
                name: "UserPostLike");

            migrationBuilder.DropTable(
                name: "UserReview");

            migrationBuilder.DropTable(
                name: "PostPart");

            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "Group");

            migrationBuilder.DropTable(
                name: "Review");

            migrationBuilder.DropTable(
                name: "Post");

            migrationBuilder.DropTable(
                name: "PostCollection");

            migrationBuilder.DropTable(
                name: "UserInfo");
        }
    }
}
