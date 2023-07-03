using todo_list_api.Dtos;
using todo_list_api.Models;

namespace todo_list_api.Services
{
    public interface ITodoService
    {
        public Task<Todo?> GetById(int id);

        public Task<IReadOnlyList<Todo>> GetAll();

        public Task<Todo> Create(TodoCreationDto todo);

        public Task<Todo> Update(int id, TodoUpdationDto todo);

        public Task<bool> Delete(int id);

        public bool IsExist(int id);
    }
}
