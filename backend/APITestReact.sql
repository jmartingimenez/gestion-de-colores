USE [APITestReact]
GO
/****** Object:  Table [dbo].[Color]    Script Date: 08/01/2021 16:22:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Color](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](max) NOT NULL,
	[Fecha_Creacion] [datetime] NOT NULL,
 CONSTRAINT [PK_Color] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 08/01/2021 16:22:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NOT NULL,
	[Contrasenia] [varchar](max) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
	[Edad] [int] NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Color] ON 

INSERT [dbo].[Color] ([Id], [Descripcion], [Fecha_Creacion]) VALUES (1, N'AZUL', CAST(N'2021-01-07T14:32:28.390' AS DateTime))
INSERT [dbo].[Color] ([Id], [Descripcion], [Fecha_Creacion]) VALUES (2, N'ROJO', CAST(N'2021-01-07T14:32:28.390' AS DateTime))
INSERT [dbo].[Color] ([Id], [Descripcion], [Fecha_Creacion]) VALUES (4, N'VIOLETA', CAST(N'2021-01-08T10:52:30.767' AS DateTime))
INSERT [dbo].[Color] ([Id], [Descripcion], [Fecha_Creacion]) VALUES (5, N'CELESTE', CAST(N'2021-01-08T10:56:36.957' AS DateTime))
INSERT [dbo].[Color] ([Id], [Descripcion], [Fecha_Creacion]) VALUES (6, N'NARANJAA', CAST(N'2021-01-08T10:57:05.643' AS DateTime))
SET IDENTITY_INSERT [dbo].[Color] OFF
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Id], [Username], [Contrasenia], [Nombre], [Apellido], [Edad]) VALUES (1, N'jgimenez', N'123', N'Jonatan', N'Gimenez', 30)
INSERT [dbo].[Usuario] ([Id], [Username], [Contrasenia], [Nombre], [Apellido], [Edad]) VALUES (2, N'Admin', N'123', N'Marco', N'Polo', NULL)
INSERT [dbo].[Usuario] ([Id], [Username], [Contrasenia], [Nombre], [Apellido], [Edad]) VALUES (3, N'MarcoPolo', N'123', N'Marco', N'Polo', NULL)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Usuario__536C85E427D05DA4]    Script Date: 08/01/2021 16:22:38 ******/
ALTER TABLE [dbo].[Usuario] ADD UNIQUE NONCLUSTERED 
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
