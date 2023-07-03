using Microsoft.EntityFrameworkCore;
using todo_list_api.Models;

namespace todo_list_api.Context
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {

        }

        public DbSet<Todo> Todos { get; set; }
    }
}
