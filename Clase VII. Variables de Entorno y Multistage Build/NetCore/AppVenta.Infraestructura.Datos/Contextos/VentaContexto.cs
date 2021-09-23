using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.EntityFrameworkCore;
using AppVenta.Dominio;
using AppVenta.Infraestructura.Datos.Configs;

namespace AppVenta.Infraestructura.Datos.Contextos {
	public class VentaContexto : DbContext {

		string CONNECTION_STRING = Environment.GetEnvironmentVariable("CONNECTION_STRING");

		public DbSet<Producto> Productos { get; set; }

		public DbSet<Venta> Ventas { get; set; }

		public DbSet<VentaDetalle> VentaDetalles { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder options) {
			options.UseSqlServer(CONNECTION_STRING);
		}

		protected override void OnModelCreating(ModelBuilder builder) {
			base.OnModelCreating(builder);

			builder.ApplyConfiguration(new ProductoConfig());
			builder.ApplyConfiguration(new VentaConfig());
			builder.ApplyConfiguration(new VentaDetalleConfig());
		}
	}
}
