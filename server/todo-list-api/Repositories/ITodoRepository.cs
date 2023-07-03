using todo_list_api.Models;

namespace todo_list_api.Repositories
{
    public interface ITodoRepository
    {        
        public Task<Todo?> GetById(int id);

        public Task<IReadOnlyList<Todo>> GetAll();

        public Task<int> Create(Todo todo);

        public Task<bool> Update(Todo todo);

        public Task<bool> Delete(int id);

        public bool IsExist(int id);
    }
}
