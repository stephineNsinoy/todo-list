using AutoMapper;
using todo_list_api.Dtos;
using todo_list_api.Models;

namespace todo_list_api.Mappings
{
    public class TodoMappings : Profile
    {
        public TodoMappings()
        {
            CreateMap<TodoCreationDto, Todo>();
            CreateMap<TodoUpdationDto, Todo>();
        }
    }
}
