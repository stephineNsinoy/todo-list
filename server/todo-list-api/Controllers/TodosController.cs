using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todo_list_api.Dtos;
using todo_list_api.Models;
using todo_list_api.Services;

namespace todo_list_api.Controllers
{
    [Route("api/todos")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly ITodoService _todoService;
        private readonly ILogger<TodosController> _logger;

        public TodosController(ITodoService todoService, ILogger<TodosController> logger)
        {
            _todoService = todoService;
            _logger = logger;
        }

        [HttpGet("{id}", Name = "GetTodoById")]
        [Produces("application/JSON")]
        [ProducesResponseType(typeof(Todo), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Todo>> GetTodoById(int id)
        {
            try
            {
                var todo = await _todoService.GetById(id);

                if (todo == null)
                {
                    return NotFound();
                }

                return Ok(todo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpGet(Name = "GetAllTodos")]
        [Produces("application/JSON")]
        [ProducesResponseType(typeof(Todo), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllTodos()
        {
            try
            {
                var todos = await _todoService.GetAll();

                if (todos == null || todos.Count == 0)
                {
                    return NoContent();
                }

                return Ok(todos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpPost]
        [Consumes("application/JSON")]
        [Produces("application/JSON")]
        [ProducesResponseType(typeof(Todo), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateTodo([FromBody] TodoCreationDto todo)
        {
            try
            {
                var newTodo = await _todoService.Create(todo);
                return CreatedAtRoute("GetTodoById", new { id = newTodo }, newTodo);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpPut("{id}", Name = "UpdateTodo")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(TodoUpdationDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] TodoUpdationDto todo)
        {
            try
            {
                var existingTodo = await _todoService.GetById(id);

                if (todo == null)
                {
                    return BadRequest();
                }

                if (existingTodo == null)
                {
                    return NotFound();
                }

                var updatedTodo = await _todoService.Update(id, todo);
                return Ok(updatedTodo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpDelete("{id}")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            try
            {
                var question = await _todoService.GetById(id);

                if (question == null)
                    return NotFound($"Question with Id = {id} is not found");

                await _todoService.Delete(id);
                return Ok($"Question with Id = {id} was Successfully Deleted");
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(500, "Something went wrong");
            }
        }
    }
}
