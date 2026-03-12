using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Text.Json; 
using WEB_API.Models;

[ApiController]
[Route("api")]
public class ExecController : ControllerBase
{
    private readonly string _connectionString;

    public ExecController(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    [HttpPost("exec")]
    public IActionResult ExecuteProcedure([FromBody] ProcedureRequest request)
    {
        using (SqlConnection conn = new SqlConnection(_connectionString))
        {
            SqlCommand cmd = new SqlCommand(request.ProcedureName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            if (request.Parameters != null)
            {
                foreach (var param in request.Parameters)
                {
                    object value = param.Value;

                    if (value is JsonElement element)
                    {
                        value = element.ValueKind switch
                        {
                            JsonValueKind.String => element.GetString(),
                            JsonValueKind.Number => element.TryGetInt32(out int i) ? i : element.GetDecimal(),
                            JsonValueKind.True => true,
                            JsonValueKind.False => false,
                            JsonValueKind.Null => DBNull.Value,
                            _ => element.GetRawText()
                        };
                    }

                    cmd.Parameters.AddWithValue("@" + param.Key, value ?? DBNull.Value);
                }
            }

            conn.Open();
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                var table = new DataTable();
                table.Load(reader);

                var rows = new List<Dictionary<string, object>>();
                foreach (DataRow row in table.Rows)
                {
                    var dict = new Dictionary<string, object>();
                    foreach (DataColumn col in table.Columns)
                    {
                        dict[col.ColumnName] = row[col] == DBNull.Value ? null : row[col];
                    }
                    rows.Add(dict);
                }

                return Ok(rows); 
            }
        }
    }

}
