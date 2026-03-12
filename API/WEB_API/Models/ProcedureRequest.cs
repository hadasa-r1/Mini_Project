namespace WEB_API.Models
{
    public class ProcedureRequest
    {
        public string ProcedureName { get; set; } 
        public Dictionary<string, object> Parameters { get; set; } 
    }
}
