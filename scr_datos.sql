ApplicationId	RoleId	RoleName	LoweredRoleName	Description
8F6346CE-159D-4911-A5B6-D21912C68EE8	3C06F3EF-AFAF-4B68-9CF3-9C0CF495C2D9	act_admininstrador	administrador de activos	Administrador
8F6346CE-159D-4911-A5B6-D21912C68EE8	CE6438FB-D1C1-4DE6-8A86-1176FFB8E9A9	act_asistente	asistente de activos	Asistente
8F6346CE-159D-4911-A5B6-D21912C68EE8	C297674F-1840-4A81-AB72-0F54AA5EBB37	act_encargado	encargado de activos	Encargado
8F6346CE-159D-4911-A5B6-D21912C68EE8	1F5CF9CC-77C9-455B-8316-91D8A2A7F1F0	act_solicitante	solicitante de activos	Funcionario
USE [campusdb]
GO
/****** Object:  Table [dbo].[act_Accion]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Accion](
	[id_accion] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[ruta] [varchar](100) NULL,
	[icono] [varchar](50) NULL,
	[id_padre] [int] NULL,
	[RoleId] [uniqueidentifier] NULL,
	[descripcion] [varchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Activo]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Activo](
	[id_activo] [int] IDENTITY(1,1) NOT NULL,
	[id_categoria] [int] NOT NULL,
	[nombre] [nvarchar](max) NOT NULL,
	[codigo] [nvarchar](max) NOT NULL,
	[cantidad] [int] NOT NULL,
	[estado] [int] NOT NULL,
	[fecha_registro] [datetime2](7) NOT NULL,
	[url_imagen] [nvarchar](max) NULL,
	[url_imagen_local] [varchar](100) NULL,
	[descripcion] [varchar](100) NULL,
 CONSTRAINT [PK_act_Activo] PRIMARY KEY CLUSTERED 
(
	[id_activo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Auditoria]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Auditoria](
	[id_auditoria] [int] IDENTITY(1,1) NOT NULL,
	[tabla_afectada] [varchar](50) NOT NULL,
	[registro_id] [int] NOT NULL,
	[usuario_id] [uniqueidentifier] NOT NULL,
	[accion] [varchar](20) NOT NULL,
	[fecha_cambio] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_auditoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Carrito]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Carrito](
	[id_carrito] [int] IDENTITY(1,1) NOT NULL,
	[id_usuario] [uniqueidentifier] NULL,
	[cantidad] [int] NULL,
	[estado] [bit] NULL,
	[id_producto] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Categoria]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Categoria](
	[id_categoria] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](max) NOT NULL,
	[descripcion] [nvarchar](max) NULL,
	[fecha_registro] [datetime2](7) NOT NULL,
	[id_categoria_padre] [int] NULL,
	[estado] [bit] NULL,
	[fecha_eliminacion] [datetime] NULL,
 CONSTRAINT [PK_act_Categoria] PRIMARY KEY CLUSTERED 
(
	[id_categoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Clave]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Clave](
	[cla_codigo] [varchar](25) NOT NULL,
	[cla_descripcion] [varchar](128) NULL,
 CONSTRAINT [PK_act_Clave] PRIMARY KEY CLUSTERED 
(
	[cla_codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_ClaveValor]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_ClaveValor](
	[cla_codigo] [varchar](25) NOT NULL,
	[clv_codigo] [int] NOT NULL,
	[clv_descripcion] [varchar](255) NULL,
	[clv_estado] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[cla_codigo] ASC,
	[clv_codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Codigos]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Codigos](
	[id_codigo] [int] IDENTITY(1,1) NOT NULL,
	[id_producto] [int] NOT NULL,
	[tipo_codigo] [varchar](10) NOT NULL,
	[valor_codigo] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Detalle_Entrega]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Detalle_Entrega](
	[id_detalle_entrega] [int] IDENTITY(1,1) NOT NULL,
	[id_entrega] [int] NOT NULL,
	[id_producto] [int] NOT NULL,
	[cantidad_entregada] [int] NOT NULL,
 CONSTRAINT [PK_act_Detalle_Entrega] PRIMARY KEY CLUSTERED 
(
	[id_detalle_entrega] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Detalle_OrdenCompra]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Detalle_OrdenCompra](
	[id_detalle_orden] [int] IDENTITY(1,1) NOT NULL,
	[id_orden] [int] NOT NULL,
	[id_producto] [int] NOT NULL,
	[cantidad] [int] NOT NULL,
	[precio_unitario] [decimal](18, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_detalle_orden] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Detalle_Solicitud]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Detalle_Solicitud](
	[id_solicitud] [int] NULL,
	[cantidad] [int] NULL,
	[id_detalle_solicitud] [int] IDENTITY(1,1) NOT NULL,
	[id_producto] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_detalle_solicitud] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Detalle_Solicitud_Presupuesto]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Detalle_Solicitud_Presupuesto](
	[id_detalle_solicitud_presupuesto] [int] IDENTITY(1,1) NOT NULL,
	[cla_unidad_medida] [int] NULL,
	[monto] [decimal](18, 2) NULL,
	[cantidad] [decimal](18, 2) NULL,
	[detalle] [varchar](300) NULL,
	[id_producto] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Distribucion_Solicitud]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Distribucion_Solicitud](
	[id_distribucion] [int] IDENTITY(1,1) NOT NULL,
	[id_producto] [int] NOT NULL,
	[id_usuario] [uniqueidentifier] NOT NULL,
	[cantidad_asignada] [int] NOT NULL,
	[id_solicitud] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_distribucion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_EntradaInventario]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_EntradaInventario](
	[id_entrada] [int] IDENTITY(1,1) NOT NULL,
	[id_producto] [int] NOT NULL,
	[cantidad] [int] NOT NULL,
	[precio_unitario] [decimal](18, 2) NOT NULL,
	[fecha_ingreso] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_entrada] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Entrega]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Entrega](
	[id_entrega] [int] IDENTITY(1,1) NOT NULL,
	[id_solicitud] [int] NOT NULL,
	[usuario_entrega] [uniqueidentifier] NOT NULL,
	[fecha_entrega] [datetime] NOT NULL,
	[estado] [bit] NULL,
	[fecha_eliminacion] [datetime] NULL,
 CONSTRAINT [PK_act_Entrega] PRIMARY KEY CLUSTERED 
(
	[id_entrega] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Entrega_Producto]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Entrega_Producto](
	[id_entrega] [int] IDENTITY(1,1) NOT NULL,
	[id_solicitud] [int] NOT NULL,
	[cantidad_entregada] [int] NOT NULL,
	[fecha_entrega] [datetime] NOT NULL,
	[usuario_entrego] [uniqueidentifier] NOT NULL,
	[usuario_recibio] [uniqueidentifier] NOT NULL,
	[id_producto] [int] NULL,
 CONSTRAINT [PK_act_Entrega_Activo] PRIMARY KEY CLUSTERED 
(
	[id_entrega] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_HistorialPrecios]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_HistorialPrecios](
	[id_historial_precio] [int] IDENTITY(1,1) NOT NULL,
	[id_producto] [int] NOT NULL,
	[precio] [decimal](18, 2) NOT NULL,
	[fecha_inicio] [datetime] NOT NULL,
	[fecha_fin] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_historial_precio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Notificaciones]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Notificaciones](
	[id_notificacion] [int] IDENTITY(1,1) NOT NULL,
	[usuario_id] [uniqueidentifier] NOT NULL,
	[mensaje] [varchar](255) NOT NULL,
	[fecha_envio] [datetime] NULL,
	[estado] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_notificacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_OrdenCompra]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_OrdenCompra](
	[id_orden] [int] IDENTITY(1,1) NOT NULL,
	[id_proveedor] [int] NOT NULL,
	[fecha_orden] [datetime] NOT NULL,
	[estado] [varchar](50) NOT NULL,
	[usuario_responsable] [uniqueidentifier] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_orden] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Presentacion]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Presentacion](
	[id_presentacion] [int] IDENTITY(1,1) NOT NULL,
	[id_producto] [int] NOT NULL,
	[descripcion] [varchar](100) NOT NULL,
	[unidades_por_presentacion] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_presentacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Producto]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Producto](
	[id_producto] [int] IDENTITY(1,1) NOT NULL,
	[id_categoria] [int] NOT NULL,
	[nombre] [nvarchar](max) NOT NULL,
	[codigo] [nvarchar](max) NOT NULL,
	[cantidad] [int] NOT NULL,
	[estado] [int] NOT NULL,
	[fecha_registro] [datetime2](7) NOT NULL,
	[url_imagen] [nvarchar](max) NULL,
	[url_imagen_local] [varchar](100) NULL,
	[descripcion] [varchar](100) NULL,
	[stock_minimo] [int] NULL,
 CONSTRAINT [PK_act_Producto] PRIMARY KEY CLUSTERED 
(
	[id_producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_ProductosProveedores]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_ProductosProveedores](
	[id_producto_proveedor] [int] IDENTITY(1,1) NOT NULL,
	[id_proveedor] [int] NOT NULL,
	[id_producto] [int] NOT NULL,
	[precio_compra] [decimal](18, 2) NOT NULL,
	[fecha_registro] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_producto_proveedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Proveedores]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Proveedores](
	[id_proveedor] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
	[contacto] [varchar](100) NOT NULL,
	[direccion] [varchar](200) NULL,
	[estado] [bit] NULL,
	[fecha_eliminacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_proveedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Solicitud]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Solicitud](
	[id_solicitud] [int] IDENTITY(1,1) NOT NULL,
	[cla_estado_solicitud] [int] NULL,
	[cla_prioridad_solicitud] [int] NULL,
	[usuario_solicitud] [uniqueidentifier] NULL,
	[usuario_revisor] [uniqueidentifier] NULL,
	[descripcion] [varchar](300) NULL,
	[fecha_entrega_deseada] [datetime] NULL,
	[fecha_solicitud] [datetime] NULL,
	[estado] [bit] NULL,
	[fecha_eliminacion] [datetime] NULL,
 CONSTRAINT [PK_act_Solicitud] PRIMARY KEY CLUSTERED 
(
	[id_solicitud] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Solicitud_Presupuesto]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Solicitud_Presupuesto](
	[id_solicitud_presupuesto] [int] IDENTITY(1,1) NOT NULL,
	[cla_estado_solicitud] [int] NULL,
	[cla_prioridad_solicitud] [int] NULL,
	[usuario_solicitud] [uniqueidentifier] NULL,
	[usuario_revisor] [uniqueidentifier] NULL,
	[monto_solicitado] [decimal](18, 2) NULL,
	[descripcion] [varchar](300) NULL,
	[fecha_solicitud] [datetime] NULL,
	[fecha_revision] [datetime] NULL,
	[comentario_revision] [varchar](300) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[act_Usuario]    Script Date: 05/07/2025 9:49:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_Usuario](
	[id_usuario] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](max) NOT NULL,
	[nombre_usuario] [nvarchar](max) NOT NULL,
	[password] [nvarchar](max) NOT NULL,
	[rol] [nvarchar](max) NOT NULL,
	[descripcion] [nvarchar](max) NULL,
	[fecha_registro] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_act_Usuario] PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[act_Accion] ON 

INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (1, N'Fucui', N'/', N'Home', NULL, N'dbd177cc-768c-4a6e-b009-c129973961f9', N'des')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (2, N'PO', N'/', N'Settings', 1, N'dbd177cc-768c-4a6e-b009-c129973961f9', N'des')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (3, N'Administración', NULL, N'Settings', NULL, N'3c06f3ef-afaf-4b68-9cf3-9c0cf495c2d9', N'Menú principal')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (4, N'Categorías', N'/categorias', N'Category', 3, N'3c06f3ef-afaf-4b68-9cf3-9c0cf495c2d9', N'Gestión de categorías')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (5, N'Productos', N'/productos', N'Inventory', 3, N'3c06f3ef-afaf-4b68-9cf3-9c0cf495c2d9', N'Gestión de productos')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (6, N'Usuarios', N'/auth/usuarios', N'People', 3, N'3c06f3ef-afaf-4b68-9cf3-9c0cf495c2d9', N'Administración de usuarios')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (7, N'Roles', N'/auth/roles', N'Security', 3, N'3c06f3ef-afaf-4b68-9cf3-9c0cf495c2d9', N'Gestión de roles')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (8, N'Reportes', N'/reportes', N'BarChart', 3, N'3c06f3ef-afaf-4b68-9cf3-9c0cf495c2d9', N'Reportes administrativos')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (9, N'Solicitudes', NULL, N'Assignment', NULL, N'ce6438fb-d1c1-4de6-8a86-1176ffb8e9a9', N'Panel de solicitudes')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (10, N'Ver Solicitudes', N'/solicitudes', N'ListAlt', 9, N'ce6438fb-d1c1-4de6-8a86-1176ffb8e9a9', N'Visualización completa')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (11, N'Gestionar Carrito', N'/carrito', N'ShoppingCart', 9, N'ce6438fb-d1c1-4de6-8a86-1176ffb8e9a9', N'Modificación de carritos')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (12, N'Inventario', NULL, N'Warehouse', NULL, N'c297674f-1840-4a81-ab72-0f54aa5ebb37', N'Panel de inventario')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (13, N'Entregas', N'/entregas', N'AssignmentTurnedIn', 12, N'c297674f-1840-4a81-ab72-0f54aa5ebb37', N'Gestión de entregas')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (14, N'Solicitudes', N'/solicitudes', N'Inbox', 12, N'c297674f-1840-4a81-ab72-0f54aa5ebb37', N'Aprobar solicitudes')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (15, N'Órdenes de Compra', N'/ordenes-compra', N'Receipt', 12, N'c297674f-1840-4a81-ab72-0f54aa5ebb37', N'Generar órdenes de compra')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (16, N'Mis Solicitudes', NULL, N'Description', NULL, N'1f5cf9cc-77c9-455b-8316-91d8a2a7f1f0', N'Panel personal de solicitudes')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (17, N'Crear Solicitud', N'/solicitudes/crear', N'PostAdd', 16, N'1f5cf9cc-77c9-455b-8316-91d8a2a7f1f0', N'Crear nuevas solicitudes')
INSERT [dbo].[act_Accion] ([id_accion], [nombre], [ruta], [icono], [id_padre], [RoleId], [descripcion]) VALUES (18, N'Ver Estado', N'/solicitudes', N'Visibility', 16, N'1f5cf9cc-77c9-455b-8316-91d8a2a7f1f0', N'Ver estado de solicitudes')
SET IDENTITY_INSERT [dbo].[act_Accion] OFF
GO
SET IDENTITY_INSERT [dbo].[act_Activo] ON 

INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (2, 1, N'Lapiz', N'900152', 100, 1, CAST(N'2024-12-21T01:15:30.4730000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (3, 1, N'carpeta', N'lps123', 12, 0, CAST(N'2024-12-23T10:38:16.3644760' AS DateTime2), N'https://localhost:7147/ImagenesActivos/0d64db148-e47f-4243-ac8b-58f2704ceb43.png', N'wwwroot\ImagenesActivos\0d64db148-e47f-4243-ac8b-58f2704ceb43.png', N'lapiz')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1003, 1002, N'Escritorio Ejecutivo', N'ACT-001', 10, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, NULL, N'Escritorio de madera')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1004, 1002, N'Silla Giratoria', N'ACT-002', 15, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, NULL, N'Silla con ruedas y respaldo alto')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1005, 1003, N'Laptop Dell', N'ACT-003', 5, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, NULL, N'Laptop Core i7 16GB RAM')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1006, 1003, N'Monitor LED 24"', N'ACT-004', 8, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, NULL, N'Monitor Full HD')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1007, 1004, N'Proyector Epson', N'ACT-005', 2, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/proyector1.jpg', N'Proyector HD para presentaciones')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1008, 1004, N'Pizarra Acrílica', N'ACT-006', 3, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/pizarra1.jpg', N'Pizarra de 1.5x2 metros')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1009, 1005, N'Archivador Metálico', N'ACT-007', 6, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/archivador1.jpg', N'Archivador de 4 gavetas')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1010, 1005, N'Mesa de Reunión', N'ACT-008', 4, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/mesa1.jpg', N'Mesa grande para reuniones')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1011, 1006, N'Caja de Lápices HB', N'ACT-009', 50, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/lapices1.jpg', N'Caja con 12 lápices')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1012, 1006, N'Resma de Papel A4', N'ACT-010', 100, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/papel1.jpg', N'Paquete de 500 hojas')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1013, 1007, N'Extintor 5kg', N'ACT-011', 3, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/extintor1.jpg', N'Extintor CO2 para emergencias')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1014, 1007, N'Botiquín de Primeros Auxilios', N'ACT-012', 2, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/botiquin1.jpg', N'Incluye medicamentos básicos')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1015, 1008, N'Router Wi-Fi', N'ACT-013', 4, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/router1.jpg', N'Router doble banda 5GHz')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1016, 1008, N'Switch 24 Puertos', N'ACT-014', 2, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/switch1.jpg', N'Switch Gigabit')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1017, 1009, N'Cámara de Seguridad', N'ACT-015', 6, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/camara1.jpg', N'Cámara HD visión nocturna')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1018, 1009, N'Grabadora DVR', N'ACT-016', 2, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/dvr1.jpg', N'DVR con almacenamiento 1TB')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1019, 1010, N'Impresora Láser', N'ACT-017', 5, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/impresora1.jpg', N'Impresora monocromática rápida')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1020, 1010, N'Cartuchos de Tinta', N'ACT-018', 20, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/cartuchos1.jpg', N'Cartuchos originales HP')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1021, 1011, N'Pintura para Oficina', N'ACT-019', 3, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/pintura1.jpg', N'Galón de pintura blanca')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1022, 1011, N'Material de Limpieza', N'ACT-020', 15, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/limpieza1.jpg', N'Set de escobas y trapeadores')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1023, 1012, N'Micrófono Inalámbrico', N'ACT-021', 2, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/microfono1.jpg', N'Micrófono para conferencias')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1024, 1012, N'Altavoz Bluetooth', N'ACT-022', 3, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/altavoz1.jpg', N'Bocina portátil potente')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1025, 1013, N'Televisor 50"', N'ACT-023', 2, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/tv1.jpg', N'Televisor Smart TV')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1026, 1013, N'Consola de Videoconferencias', N'ACT-024', 1, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/consola1.jpg', N'Kit de videollamadas profesionales')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1027, 1014, N'Cinta Adhesiva', N'ACT-025', 30, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/cinta1.jpg', N'Paquete de 10 rollos')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1028, 1014, N'Grapadora de Oficina', N'ACT-026', 10, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/grapadora1.jpg', N'Grapadora con 500 grapas')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1029, 1015, N'Marcadores para Pizarra', N'ACT-027', 20, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/marcadores1.jpg', N'Set de 4 colores')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1030, 1015, N'Toners para Impresora', N'ACT-028', 10, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/toner1.jpg', N'Toner negro compatible')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1031, 1015, N'Disco Duro Externo 1TB', N'ACT-029', 5, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/disco1.jpg', N'Almacenamiento portátil USB 3.0')
INSERT [dbo].[act_Activo] ([id_activo], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion]) VALUES (1032, 1015, N'Memoria USB 64GB', N'ACT-030', 10, 1, CAST(N'2025-01-29T12:40:17.7300000' AS DateTime2), NULL, N'local/usb1.jpg', N'Memoria USB rápida y confiable')
SET IDENTITY_INSERT [dbo].[act_Activo] OFF
GO
SET IDENTITY_INSERT [dbo].[act_Carrito] ON 

INSERT [dbo].[act_Carrito] ([id_carrito], [id_usuario], [cantidad], [estado], [id_producto]) VALUES (16004, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', 1, 1, 1)
SET IDENTITY_INSERT [dbo].[act_Carrito] OFF
GO
SET IDENTITY_INSERT [dbo].[act_Categoria] ON 

INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1, N'Material de escritorio', N'Material de escritorio', CAST(N'2024-12-17T17:10:02.4228285' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (2, N'Muebles', N'Muebles de oficinas, aulas, limpieza necesarios para desempeñar las labores de la universidad', CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1002, N'Equipos de Cómputo', N'Laptops, monitores y otros dispositivos de cómputo', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1003, N'Audiovisuales', N'Proyectores, pizarras y equipos de presentación', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1004, N'Mobiliario de Oficina', N'Escritorios, sillas y mesas de reunión', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1005, N'Papelería', N'Resmas de papel, lápices y otros artículos de oficina', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1006, N'Seguridad', N'Extintores, botiquines y equipos de seguridad', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1007, N'Redes y Comunicación', N'Routers, switches y equipos de conectividad', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1008, N'Vigilancia', N'Cámaras de seguridad y equipos de monitoreo', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1009, N'Impresión', N'Impresoras, cartuchos y suministros de impresión', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1010, N'Mantenimiento y Limpieza', N'Materiales de limpieza y mantenimiento de infraestructura', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1011, N'Sonido y Conferencias', N'Micrófonos, altavoces y equipos de audio', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1012, N'Multimedia', N'Televisores y equipos de videoconferencia', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1013, N'Accesorios de Oficina', N'Cintas adhesivas, grapadoras y otros accesorios', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1014, N'Suministros de Escritorio', N'Marcadores, toners y otros insumos', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1015, N'Almacenamiento Digital', N'Discos duros y memorias USB', CAST(N'2025-01-29T12:39:55.0970000' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1016, N'papel cebolla', N'des', CAST(N'2025-06-22T17:51:13.0658908' AS DateTime2), 1005, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1017, N'papel lustroso', N'este es papel', CAST(N'2025-06-22T23:17:50.9896083' AS DateTime2), 1005, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1018, N'papel higienico', N'papel', CAST(N'2025-06-22T23:37:07.0041003' AS DateTime2), 1010, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1019, N'camion', N'camion de transporte', CAST(N'2025-06-22T23:57:16.6503969' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1020, N'heladera', N'es una heladera para gastronomia', CAST(N'2025-06-22T23:58:24.5950487' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1021, N'moises', N'as', CAST(N'2025-06-23T00:06:05.0052112' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1022, N'as', N'as', CAST(N'2025-06-23T00:06:51.9159550' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1023, N'qw', N'ww', CAST(N'2025-06-23T00:07:24.5433240' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1024, N'mesa', N'mesa', CAST(N'2025-06-23T00:24:15.6287427' AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[act_Categoria] ([id_categoria], [nombre], [descripcion], [fecha_registro], [id_categoria_padre], [estado], [fecha_eliminacion]) VALUES (1026, N'papeleria', N'des', CAST(N'2025-06-26T00:08:00.1028018' AS DateTime2), 0, NULL, NULL)
SET IDENTITY_INSERT [dbo].[act_Categoria] OFF
GO
INSERT [dbo].[act_Clave] ([cla_codigo], [cla_descripcion]) VALUES (N'cla_estado_activo', N'Estado del activo ')
INSERT [dbo].[act_Clave] ([cla_codigo], [cla_descripcion]) VALUES (N'cla_estado_solicitud', N'Estado de una solicitud')
INSERT [dbo].[act_Clave] ([cla_codigo], [cla_descripcion]) VALUES (N'cla_prioridad_solicitud', N'Prioridad de las Solicitudes ')
GO
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_activo', 1, N'Nuevo', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_activo', 2, N'Usado', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_activo', 3, N'Reparacion', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_activo', 4, N'Mantenimiento', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_activo', 5, N'Obsoleto', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_activo', 6, N'Retirado', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_activo', 7, N'Dañado', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_activo', 8, N'Prestamo', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_solicitud', 1, N'Pendiente', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_solicitud', 2, N'En Revisión', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_solicitud', 3, N'Aprobada Parcialmente', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_solicitud', 4, N'Aprobada', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_solicitud', 5, N'En Proceso de Entrega', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_solicitud', 6, N'Entregada ', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_estado_solicitud', 7, N'Rechazada', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_prioridad_solicitud', 1, N'Alta', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_prioridad_solicitud', 2, N'Media', 1)
INSERT [dbo].[act_ClaveValor] ([cla_codigo], [clv_codigo], [clv_descripcion], [clv_estado]) VALUES (N'cla_prioridad_solicitud', 3, N'Baja', 1)
GO
SET IDENTITY_INSERT [dbo].[act_Detalle_Solicitud] ON 

INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (13, 1, 1, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (14, 1, 2, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (15, 30, 3, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (16, 30, 4, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (17, 55, 5, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (17, 5, 6, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (18, 10, 7, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (19, 10, 8, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1002, 10, 1002, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1002, 25, 1003, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (2002, 0, 2002, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (3002, 10, 3002, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4002, 1, 4002, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4002, 1, 4003, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4002, 1, 4004, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4002, 1, 4005, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4002, 1, 4006, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4003, 1, 4007, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4003, 1, 4008, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4003, 1, 4009, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4003, 1, 4010, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4003, 1, 4011, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (5004, 15, 4012, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (5004, 1, 4013, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (5004, 1, 4014, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (5004, 1, 4015, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (6004, 1, 5012, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (6005, 1, 5013, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (7006, 1, 5014, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (7006, 1, 5015, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (2, 1, 5016, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (2, 1, 5017, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (3, 1, 5018, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (3, 1, 5019, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4, 10, 5020, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4, 9, 5021, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4, 5, 5022, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4, 4, 5023, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1003, 1, 6014, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1003, 1, 6015, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1003, 5, 6016, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1004, 1, 6017, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1004, 1, 6018, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1004, 5, 6019, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1005, 1, 6020, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1005, 1, 6021, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1005, 5, 6022, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1006, 1, 6023, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1006, 1, 6024, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1006, 5, 6025, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1, 1, 6026, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1, 1, 6027, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1, 5, 6028, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (2, 1, 6029, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (2, 1, 6030, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (2, 5, 6031, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (3, 1, 6032, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (3, 1, 6033, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (3, 5, 6034, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4, 1, 6035, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4, 1, 6036, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4, 5, 6037, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (5, 1, 6038, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (5, 1, 6039, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (5, 5, 6040, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (6, 1, 6041, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (6, 1, 6042, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (6, 5, 6043, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (7, 1, 6044, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (7, 1, 6045, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (7, 5, 6046, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (8, 1, 6047, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (8, 1, 6048, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (8, 5, 6049, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (9, 1, 6050, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (9, 1, 6051, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (9, 5, 6052, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (10, 1, 6053, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (10, 1, 6054, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (10, 5, 6055, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (11, 1, 6056, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (12, 1, 6057, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (13, 1, 6058, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (13, 1, 6059, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (13, 5, 6060, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (14, 1, 6061, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (14, 1, 6062, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (14, 5, 6063, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (15, 1, 6064, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (15, 1, 6065, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (15, 5, 6066, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (16, 1, 6067, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (16, 1, 6068, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (16, 5, 6069, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (17, 1, 6070, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (17, 1, 6071, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (17, 5, 6072, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (18, 1, 6073, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (18, 1, 6074, NULL)
GO
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (18, 5, 6075, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (19, 1, 6076, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (19, 1, 6077, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (19, 5, 6078, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (20, 1, 6079, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (20, 1, 6080, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (20, 5, 6081, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (21, 1, 6082, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (21, 1, 6083, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (21, 5, 6084, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (22, 1, 6085, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (22, 1, 6086, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (22, 5, 6087, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (23, 1, 6088, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (23, 1, 6089, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (23, 5, 6090, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (24, 1, 6091, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (1001, 1, 7014, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (2001, 1, 8014, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (3001, 1, 9014, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (3001, 1, 9015, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (3001, 5, 9016, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (3001, 5, 9017, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (3001, 1, 9018, NULL)
INSERT [dbo].[act_Detalle_Solicitud] ([id_solicitud], [cantidad], [id_detalle_solicitud], [id_producto]) VALUES (4001, 5, 10014, NULL)
SET IDENTITY_INSERT [dbo].[act_Detalle_Solicitud] OFF
GO
SET IDENTITY_INSERT [dbo].[act_Producto] ON 

INSERT [dbo].[act_Producto] ([id_producto], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion], [stock_minimo]) VALUES (1, 1, N'papel', N'PPP', 1, 1, CAST(N'2025-05-25T00:00:00.0000000' AS DateTime2), NULL, NULL, N'hojas de papel', NULL)
INSERT [dbo].[act_Producto] ([id_producto], [id_categoria], [nombre], [codigo], [cantidad], [estado], [fecha_registro], [url_imagen], [url_imagen_local], [descripcion], [stock_minimo]) VALUES (2, 0, N'string', N'string', 0, 0, CAST(N'2025-06-07T13:26:12.2010960' AS DateTime2), N'string', N'string', N'string', NULL)
SET IDENTITY_INSERT [dbo].[act_Producto] OFF
GO
SET IDENTITY_INSERT [dbo].[act_Solicitud] ON 

INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (1, 1, 1, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'des', CAST(N'2025-12-18T00:00:00.000' AS DateTime), CAST(N'2025-03-15T01:30:50.903' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (2, 1, 1, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'des', CAST(N'2025-12-18T00:00:00.000' AS DateTime), CAST(N'2025-03-15T01:33:13.963' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (3, 1, 3, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'des', CAST(N'2025-04-11T00:00:00.000' AS DateTime), CAST(N'2025-03-15T01:58:40.557' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (4, 1, 3, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'des', CAST(N'2025-04-11T00:00:00.000' AS DateTime), CAST(N'2025-03-15T02:01:10.330' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (5, 1, 3, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'des', CAST(N'2025-04-11T00:00:00.000' AS DateTime), CAST(N'2025-03-15T02:01:51.340' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (6, 1, 3, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'des', CAST(N'2025-04-11T00:00:00.000' AS DateTime), CAST(N'2025-03-15T02:04:21.153' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (7, 1, 3, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'des', CAST(N'2025-04-11T00:00:00.000' AS DateTime), CAST(N'2025-03-15T02:05:36.297' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (8, 1, 3, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'des', CAST(N'2025-04-11T00:00:00.000' AS DateTime), CAST(N'2025-03-15T02:12:33.547' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (9, 1, 3, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'des', CAST(N'2025-04-11T00:00:00.000' AS DateTime), CAST(N'2025-03-15T02:14:46.747' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (10, 1, 3, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'des', CAST(N'2025-04-11T00:00:00.000' AS DateTime), CAST(N'2025-03-15T02:23:24.200' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (11, 1, 1, N'3fa85f64-5717-4562-b3fc-2c963f66afa6', N'3fa85f64-5717-4562-b3fc-2c963f66afa6', N'string', CAST(N'2025-03-15T06:25:26.787' AS DateTime), CAST(N'2025-03-15T02:31:05.060' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (12, 1, 1, N'3fa85f64-5717-4562-b3fc-2c963f66afa6', N'3fa85f64-5717-4562-b3fc-2c963f66afa6', N'string', CAST(N'2025-03-15T06:25:26.787' AS DateTime), CAST(N'2025-03-15T02:38:09.533' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (13, 1, 2, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'jknkj', CAST(N'2025-12-15T00:00:00.000' AS DateTime), CAST(N'2025-03-15T02:42:52.160' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (14, 1, 2, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'jknkj', CAST(N'2025-12-15T00:00:00.000' AS DateTime), CAST(N'2025-03-15T09:23:56.953' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (15, 1, 2, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'jknkj', CAST(N'2025-12-15T00:00:00.000' AS DateTime), CAST(N'2025-03-15T09:34:35.573' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (16, 1, 2, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'bbbb', CAST(N'2025-12-12T00:00:00.000' AS DateTime), CAST(N'2025-03-15T09:45:46.513' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (17, 1, 2, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'bbbb', CAST(N'2025-12-12T00:00:00.000' AS DateTime), CAST(N'2025-03-15T09:46:42.753' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (18, 1, 2, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'bbbb', CAST(N'2025-12-12T00:00:00.000' AS DateTime), CAST(N'2025-03-15T09:46:48.660' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (19, 1, 2, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'bbbb', CAST(N'2025-12-12T00:00:00.000' AS DateTime), CAST(N'2025-03-15T09:46:56.513' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (20, 1, 2, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'trtr', CAST(N'2025-12-18T00:00:00.000' AS DateTime), CAST(N'2025-03-15T10:23:30.370' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (21, 1, 2, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'trtr', CAST(N'2025-12-18T00:00:00.000' AS DateTime), CAST(N'2025-03-15T10:23:39.907' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (22, 1, 2, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'trtr', CAST(N'2025-12-18T00:00:00.000' AS DateTime), CAST(N'2025-03-15T11:20:41.887' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (23, 1, 2, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'ssss', CAST(N'2025-12-20T00:00:00.000' AS DateTime), CAST(N'2025-03-15T11:28:10.823' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (24, 1, 2, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'ososo', CAST(N'2025-12-20T00:00:00.000' AS DateTime), CAST(N'2025-03-15T11:38:39.507' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (1001, 1, 1, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'jjjj', CAST(N'2025-03-21T00:00:00.000' AS DateTime), CAST(N'2025-03-20T00:37:31.947' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (2001, 1, 2, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'asasas', CAST(N'2025-03-29T00:00:00.000' AS DateTime), CAST(N'2025-03-27T23:45:01.290' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (3001, 1, 1, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'ssasdgfhvg', CAST(N'2025-05-22T00:00:00.000' AS DateTime), CAST(N'2025-05-15T11:19:25.637' AS DateTime), NULL, NULL)
INSERT [dbo].[act_Solicitud] ([id_solicitud], [cla_estado_solicitud], [cla_prioridad_solicitud], [usuario_solicitud], [usuario_revisor], [descripcion], [fecha_entrega_deseada], [fecha_solicitud], [estado], [fecha_eliminacion]) VALUES (4001, 1, 1, N'27bfd3a0-c8ef-41cb-875b-413e7aa681ef', N'00000000-0000-0000-0000-000000000000', N'paraa mañansa', CAST(N'2025-05-22T00:00:00.000' AS DateTime), CAST(N'2025-05-20T20:15:36.437' AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[act_Solicitud] OFF
GO
SET IDENTITY_INSERT [dbo].[act_Usuario] ON 

INSERT [dbo].[act_Usuario] ([id_usuario], [nombre], [nombre_usuario], [password], [rol], [descripcion], [fecha_registro]) VALUES (2, N'osmar', N'Osmar1!', N'a36f6f83a5d9e3570012ccf831afa660', N'admin', NULL, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[act_Usuario] OFF
GO
ALTER TABLE [dbo].[act_Auditoria] ADD  DEFAULT (getdate()) FOR [fecha_cambio]
GO
ALTER TABLE [dbo].[act_EntradaInventario] ADD  DEFAULT (getdate()) FOR [fecha_ingreso]
GO
ALTER TABLE [dbo].[act_Entrega] ADD  DEFAULT (getdate()) FOR [fecha_entrega]
GO
ALTER TABLE [dbo].[act_Entrega] ADD  DEFAULT ((1)) FOR [estado]
GO
ALTER TABLE [dbo].[act_Entrega_Producto] ADD  DEFAULT (getdate()) FOR [fecha_entrega]
GO
ALTER TABLE [dbo].[act_Notificaciones] ADD  DEFAULT (getdate()) FOR [fecha_envio]
GO
ALTER TABLE [dbo].[act_Notificaciones] ADD  DEFAULT ((1)) FOR [estado]
GO
ALTER TABLE [dbo].[act_OrdenCompra] ADD  DEFAULT (getdate()) FOR [fecha_orden]
GO
ALTER TABLE [dbo].[act_ProductosProveedores] ADD  DEFAULT (getdate()) FOR [fecha_registro]
GO
ALTER TABLE [dbo].[act_Proveedores] ADD  DEFAULT ((1)) FOR [estado]
GO
ALTER TABLE [dbo].[act_Solicitud] ADD  DEFAULT ((1)) FOR [estado]
GO
ALTER TABLE [dbo].[act_Auditoria]  WITH CHECK ADD  CONSTRAINT [FK_Auditoria_Usuario] FOREIGN KEY([usuario_id])
REFERENCES [dbo].[aspnet_Users] ([UserId])
GO
ALTER TABLE [dbo].[act_Auditoria] CHECK CONSTRAINT [FK_Auditoria_Usuario]
GO
ALTER TABLE [dbo].[act_Detalle_Entrega]  WITH CHECK ADD  CONSTRAINT [FK_act_Detalle_Entrega_Entrega] FOREIGN KEY([id_entrega])
REFERENCES [dbo].[act_Entrega] ([id_entrega])
GO
ALTER TABLE [dbo].[act_Detalle_Entrega] CHECK CONSTRAINT [FK_act_Detalle_Entrega_Entrega]
GO
ALTER TABLE [dbo].[act_Detalle_Entrega]  WITH CHECK ADD  CONSTRAINT [FK_act_Detalle_Entrega_Producto] FOREIGN KEY([id_producto])
REFERENCES [dbo].[act_Producto] ([id_producto])
GO
ALTER TABLE [dbo].[act_Detalle_Entrega] CHECK CONSTRAINT [FK_act_Detalle_Entrega_Producto]
GO
ALTER TABLE [dbo].[act_Detalle_OrdenCompra]  WITH CHECK ADD  CONSTRAINT [FK_DetalleOC_Orden] FOREIGN KEY([id_orden])
REFERENCES [dbo].[act_OrdenCompra] ([id_orden])
GO
ALTER TABLE [dbo].[act_Detalle_OrdenCompra] CHECK CONSTRAINT [FK_DetalleOC_Orden]
GO
ALTER TABLE [dbo].[act_Detalle_OrdenCompra]  WITH CHECK ADD  CONSTRAINT [FK_DetalleOC_Producto] FOREIGN KEY([id_producto])
REFERENCES [dbo].[act_Producto] ([id_producto])
GO
ALTER TABLE [dbo].[act_Detalle_OrdenCompra] CHECK CONSTRAINT [FK_DetalleOC_Producto]
GO
ALTER TABLE [dbo].[act_Distribucion_Solicitud]  WITH CHECK ADD  CONSTRAINT [FK_Distribucion_Producto] FOREIGN KEY([id_producto])
REFERENCES [dbo].[act_Producto] ([id_producto])
GO
ALTER TABLE [dbo].[act_Distribucion_Solicitud] CHECK CONSTRAINT [FK_Distribucion_Producto]
GO
ALTER TABLE [dbo].[act_Distribucion_Solicitud]  WITH CHECK ADD  CONSTRAINT [FK_Distribucion_Solicitud] FOREIGN KEY([id_solicitud])
REFERENCES [dbo].[act_Solicitud] ([id_solicitud])
GO
ALTER TABLE [dbo].[act_Distribucion_Solicitud] CHECK CONSTRAINT [FK_Distribucion_Solicitud]
GO
ALTER TABLE [dbo].[act_Distribucion_Solicitud]  WITH CHECK ADD  CONSTRAINT [FK_Distribucion_Usuario] FOREIGN KEY([id_usuario])
REFERENCES [dbo].[aspnet_Users] ([UserId])
GO
ALTER TABLE [dbo].[act_Distribucion_Solicitud] CHECK CONSTRAINT [FK_Distribucion_Usuario]
GO
ALTER TABLE [dbo].[act_EntradaInventario]  WITH CHECK ADD  CONSTRAINT [FK_Entrada_Producto] FOREIGN KEY([id_producto])
REFERENCES [dbo].[act_Producto] ([id_producto])
GO
ALTER TABLE [dbo].[act_EntradaInventario] CHECK CONSTRAINT [FK_Entrada_Producto]
GO
ALTER TABLE [dbo].[act_Entrega]  WITH CHECK ADD  CONSTRAINT [FK_act_Entrega_Solicitud] FOREIGN KEY([id_solicitud])
REFERENCES [dbo].[act_Solicitud] ([id_solicitud])
GO
ALTER TABLE [dbo].[act_Entrega] CHECK CONSTRAINT [FK_act_Entrega_Solicitud]
GO
ALTER TABLE [dbo].[act_HistorialPrecios]  WITH CHECK ADD  CONSTRAINT [FK_HistorialPrecios_Producto] FOREIGN KEY([id_producto])
REFERENCES [dbo].[act_Producto] ([id_producto])
GO
ALTER TABLE [dbo].[act_HistorialPrecios] CHECK CONSTRAINT [FK_HistorialPrecios_Producto]
GO
ALTER TABLE [dbo].[act_Notificaciones]  WITH CHECK ADD  CONSTRAINT [FK_Notificaciones_Usuario] FOREIGN KEY([usuario_id])
REFERENCES [dbo].[aspnet_Users] ([UserId])
GO
ALTER TABLE [dbo].[act_Notificaciones] CHECK CONSTRAINT [FK_Notificaciones_Usuario]
GO
ALTER TABLE [dbo].[act_OrdenCompra]  WITH CHECK ADD  CONSTRAINT [FK_OC_Proveedor] FOREIGN KEY([id_proveedor])
REFERENCES [dbo].[act_Proveedores] ([id_proveedor])
GO
ALTER TABLE [dbo].[act_OrdenCompra] CHECK CONSTRAINT [FK_OC_Proveedor]
GO
ALTER TABLE [dbo].[act_OrdenCompra]  WITH CHECK ADD  CONSTRAINT [FK_OC_Usuario] FOREIGN KEY([usuario_responsable])
REFERENCES [dbo].[aspnet_Users] ([UserId])
GO
ALTER TABLE [dbo].[act_OrdenCompra] CHECK CONSTRAINT [FK_OC_Usuario]
GO
ALTER TABLE [dbo].[act_Presentacion]  WITH CHECK ADD  CONSTRAINT [FK_Presentacion_Producto] FOREIGN KEY([id_producto])
REFERENCES [dbo].[act_Producto] ([id_producto])
GO
ALTER TABLE [dbo].[act_Presentacion] CHECK CONSTRAINT [FK_Presentacion_Producto]
GO
ALTER TABLE [dbo].[act_ProductosProveedores]  WITH CHECK ADD  CONSTRAINT [FK_ProductosProveedores_Producto] FOREIGN KEY([id_producto])
REFERENCES [dbo].[act_Producto] ([id_producto])
GO
ALTER TABLE [dbo].[act_ProductosProveedores] CHECK CONSTRAINT [FK_ProductosProveedores_Producto]
GO
