using Microsoft.EntityFrameworkCore;
using todo_list_api.Context;
using todo_list_api.Models;

namespace todo_list_api.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoContext _dbContext;

        public TodoRepository(TodoContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> Create(Todo todo)
        {
            _dbContext.Todos.Add(todo);
            await _dbContext.SaveChangesAsync();
            return todo.Id;
        }

        public async Task<bool> Delete(int id)
        {  
            var todo = await _dbContext.Todos.FindAsync(id);
            _dbContext.Todos.Remove(todo!);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<IReadOnlyList<Todo>> GetAll() => await _dbContext.Todos.ToListAsync();


        public async Task<Todo?> GetById(int id) => await _dbContext.Todos.FindAsync(id);

        public async Task<bool> Update(Todo todo)
        {
            var existingTodo = await _dbContext.Todos.FindAsync(todo.Id);
            if (existingTodo != null)
            {
                _dbContext.Entry(existingTodo).CurrentValues.SetValues(todo);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public bool IsExist(int id) => (_dbContext.Todos?.Any(x => x.Id == id)).GetValueOrDefault();
       
    }
}
