namespace todo_list_api.Dtos
{
    public class TodoUpdationDto
    {
        public string Task { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
    }
}
