using AutoMapper;
using todo_list_api.Dtos;
using todo_list_api.Models;
using todo_list_api.Repositories;

namespace todo_list_api.Services
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _todoRepository;
        private readonly IMapper _mapper;

        public TodoService(ITodoRepository todoRepository, IMapper mapper)
        {
            _todoRepository = todoRepository;
            _mapper = mapper;
        }

        public async Task<Todo> Create(TodoCreationDto todo)
        {
            var todoModel = _mapper.Map<Todo>(todo);
            todoModel.Id = await _todoRepository.Create(todoModel);
            return todoModel;
        }

        public Task<bool> Delete(int id) => _todoRepository.Delete(id);
        
        public Task<IReadOnlyList<Todo>> GetAll() => _todoRepository.GetAll();

        public Task<Todo?> GetById(int id) => _todoRepository.GetById(id);

        public bool IsExist(int id) => _todoRepository.IsExist(id);

        public async Task<Todo> Update(int id, TodoUpdationDto todo)
        {
            var todoModel = _mapper.Map<Todo>(todo);
            todoModel.Id = id;
            await _todoRepository.Update(todoModel);
            return todoModel;
        }
    }
}
