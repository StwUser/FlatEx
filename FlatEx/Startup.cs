using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using DBRepository;
using DBRepository.Interfaces;
using DBRepository.Repositories;
using Microsoft.Extensions.Configuration;
using Models.Models;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using React.AspNet;
using JavaScriptEngineSwitcher.ChakraCore;

namespace FlatEx
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            string connection = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<RepositoryContext>(options => options.UseSqlServer(connection));

            services.AddScoped<IRepository<User>, UserRepository>();

            services.AddScoped<IRepository<ApartmentOffer>, ApartmentOfferRepository>();

            services.AddScoped<IRepository<ApartmentDemand>, ApartmentDemandRepository>();

            services.AddMvc();

            services.AddReact();
            services.AddJsEngineSwitcher(options => options.DefaultEngineName = ChakraCoreJsEngine.EngineName).AddChakraCore();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseReact(config => { });
            app.UseDefaultFiles();
            app.UseStaticFiles();
            /*
            app.UseRouting();

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });*/
        }
    }
}
