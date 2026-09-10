import { InterviewQuestion } from '../types';

export const questionsPart2: InterviewQuestion[] = [
  {
    id: 68,
    questionNumber: 68,
    category: 'SQL',
    title: 'WHAT IS THE DIFFERENCE BETWEEN DBMS AND RDBMS?',
    shortSummary: 'DBMS stores data as flat files without relations; RDBMS organizes data in relational tables with foreign keys, integrity constraints, and normalization.',
    detailedPoints: [
      '1. Storage format: DBMS stores data as files; RDBMS stores data in TABULAR form (rows and columns).',
      '2. Relationships: In DBMS there is no relationship between data; In RDBMS data is linked via Primary and Foreign key relationships.',
      '3. Normalization: Normalization is absent in DBMS; Normalization is present in RDBMS to remove data redundancy.',
      '4. Scale: DBMS is suited for small single-user datasets; RDBMS handles large enterprise datasets with multi-user concurrency.',
      '5. Examples: DBMS: XML, File systems; RDBMS: SQL Server, Oracle, PostgreSQL, MySQL.'
    ],
    keyTakeaways: [
      'RDBMS enforces relational integrity and ACID compliance.',
      'DBMS lacks foreign keys and cross-table normalization.',
      'Modern relational databases (SQL Server, PostgreSQL) are RDBMS.'
    ],
    companyTags: ['TCS', 'Infosys', 'Tech Mahindra'],
    difficulty: 'Easy'
  },
  {
    id: 69,
    questionNumber: 69,
    category: 'SQL',
    title: 'WHAT IS A CONSTRAINT IN SQL? WHAT ARE ITS TYPES?',
    shortSummary: 'SQL constraints are rules enforced on table columns to ensure data accuracy, uniqueness, and integrity.',
    detailedPoints: [
      'SQL constraints specify rules for the data in a table and limit the type of data that can be inserted.',
      'The 6 Primary Constraints in SQL Server:',
      '1. PRIMARY KEY: Uniquely identifies each row in a table. Cannot contain NULL values.',
      '2. NOT NULL: Enforces that a column cannot store NULL values.',
      '3. FOREIGN KEY: Uniquely identifies a row in another related table (enforces referential integrity).',
      '4. CHECK: Validates that values in a column satisfy a boolean condition (e.g. `Age >= 18`).',
      '5. DEFAULT: Specifies a default value when no explicit value is inserted (e.g. `DEFAULT GETDATE()`).',
      '6. UNIQUE: Ensures that all values in a column or set of columns are distinct (allows one NULL in SQL Server).'
    ],
    codeSnippet: {
      language: 'sql',
      code: `CREATE TABLE Students (
    ID int NOT NULL PRIMARY KEY,
    Name varchar(255) NOT NULL,
    CourseID int FOREIGN KEY REFERENCES Courses(CourseID),
    Age int NOT NULL CHECK (Age >= 18),
    AdmissionDate date DEFAULT GETDATE(),
    CONSTRAINT UC_Student UNIQUE (ID, Name)
);`,
      explanation: 'Table demonstrates PRIMARY KEY, NOT NULL, FOREIGN KEY, CHECK, DEFAULT, and UNIQUE constraints.'
    },
    keyTakeaways: [
      'Constraints guarantee database data integrity.',
      'Primary Key automatically creates a clustered index.',
      'Foreign Keys enforce referential integrity between parent and child tables.'
    ],
    companyTags: ['Microsoft', 'Infosys', 'Accenture'],
    difficulty: 'Easy'
  },
  {
    id: 70,
    questionNumber: 70,
    category: 'SQL',
    title: 'WHAT IS THE DIFFERENCE BETWEEN PRIMARY KEY AND UNIQUE KEY?',
    shortSummary: 'Primary Key allows no NULLs and creates a Clustered Index (one per table); Unique Key allows one NULL in SQL Server and creates a Non-Clustered Index (multiple per table).',
    detailedPoints: [
      '1. NULL acceptance: Primary Key NEVER accepts NULL values; Unique Key can accept one NULL in SQL Server.',
      '2. Index Creation: Primary Key creates a CLUSTERED INDEX by default; Unique Key creates a NON-CLUSTERED INDEX by default.',
      '3. Frequency per table: A table can have only ONE Primary Key; A table can have MULTIPLE Unique Keys.'
    ],
    keyTakeaways: [
      'Primary Key: No NULLs, only 1 per table, clustered index by default.',
      'Unique Key: 1 NULL allowed in SQL Server, multiple allowed per table, non-clustered index.'
    ],
    companyTags: ['TCS', 'Cognizant', 'HCL'],
    difficulty: 'Easy'
  },
  {
    id: 76,
    questionNumber: 76,
    category: 'SQL',
    title: 'WHAT ARE JOINS IN SQL? WHAT ARE THE TYPES OF JOINS IN SQL SERVER?',
    shortSummary: 'Joins combine records from two or more tables based on a related common column: INNER, LEFT OUTER, RIGHT OUTER, and FULL OUTER.',
    detailedPoints: [
      'A join clause is used to COMBINE rows from two or more tables based on a related column between them.',
      'Core Join Types in SQL Server:',
      '1. INNER JOIN: Returns only records that have matching values in both tables. Most commonly used join.',
      '2. LEFT (OUTER) JOIN: Returns all records from the left table, and matching records from the right table (NULL if no match).',
      '3. RIGHT (OUTER) JOIN: Returns all records from the right table, and matching records from the left table.',
      '4. FULL (OUTER) JOIN: Returns all records when there is a match in either the left or right table.',
      '5. CROSS JOIN: Produces the Cartesian product of rows from both tables.'
    ],
    codeSnippet: {
      language: 'sql',
      code: `-- INNER JOIN
SELECT e.FirstName, d.DepartmentName
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.ID;

-- LEFT OUTER JOIN
SELECT e.FirstName, d.DepartmentName
FROM Employees e
LEFT JOIN Departments d ON e.DepartmentID = d.ID;`,
      explanation: 'Inner join excludes unmatched rows; Left outer join preserves all rows from left table.'
    },
    diagram: {
      type: 'sql-joins',
      title: 'Venn Diagram Representation of SQL Joins'
    },
    keyTakeaways: [
      'INNER JOIN = Intersection of matching keys.',
      'LEFT JOIN = All from Table A + matches from Table B.',
      'FULL OUTER JOIN = Union of both tables with NULLs where keys do not match.'
    ],
    companyTags: ['Microsoft', 'Amazon', 'Accenture', 'Infosys'],
    difficulty: 'Medium'
  },
  {
    id: 78,
    questionNumber: 78,
    category: 'SQL',
    title: 'WHAT IS SELF-JOIN? WRITE A QUERY TO FETCH EMPLOYEES AND THEIR MANAGERS.',
    shortSummary: 'A self-join is a table joined with itself to compare rows within the same table, such as hierarchical employee-manager structures.',
    detailedPoints: [
      'A self-join is a join of a table to itself using distinct table aliases.',
      'Common use case: An Employee table where each employee has a `manager_id` referencing another employee in the same table.',
      'To fetch employee names along with their manager names, join the table to itself using `LEFT JOIN` (so the CEO who has no manager is still included).'
    ],
    codeSnippet: {
      language: 'sql',
      code: `SELECT 
    e.first_name AS employee,
    m.first_name AS manager
FROM employees e
LEFT JOIN employees m 
    ON e.manager_id = m.employee_id
ORDER BY manager;`,
      explanation: 'e represents the employee row; m represents the manager row from the same table.'
    },
    keyTakeaways: [
      'Self-join requires table aliases (e.g. `e` and `m`).',
      'Use LEFT JOIN to include top-level records that have NULL manager_id.',
      'Useful for hierarchies, org charts, and bill-of-materials.'
    ],
    companyTags: ['TCS', 'Infosys', 'Tech Mahindra'],
    difficulty: 'Medium'
  },
  {
    id: 81,
    questionNumber: 81,
    category: 'SQL',
    title: 'WHAT IS THE DIFFERENCE BETWEEN CLUSTERED AND NON-CLUSTERED INDEX?',
    shortSummary: 'A clustered index physically sorts table rows on disk (1 per table like a dictionary); non-clustered indexes store sorted keys with row pointers (multiple per table like a book index).',
    detailedPoints: [
      '1. Physical Storage:',
      '   • Clustered Index: Defines the physical order of data rows on disk. Leaf nodes contain the actual data pages. Think of a Dictionary (words arranged alphabetically).',
      '   • Non-Clustered Index: Stored in a separate structure. Leaf nodes contain index keys and row pointers (RID or clustered index key). Think of a Book Index.',
      '2. Quantity per table: Only 1 Clustered index can exist per table (data can only be ordered one physical way); Up to 999 Non-Clustered indexes can exist on a table in SQL Server.',
      '3. Speed: Clustered index lookups are faster because no secondary pointer lookup is needed.',
      '4. Primary Key: Creating a Primary Key automatically creates a clustered index unless specified otherwise.'
    ],
    codeSnippet: {
      language: 'sql',
      code: `-- Clustered Index
CREATE CLUSTERED INDEX IX_Employee_EmpID 
ON Employees (EmpID ASC);

-- Non-Clustered Index for searching by Last Name
CREATE NONCLUSTERED INDEX IX_Employee_LastName 
ON Employees (LastName ASC);`,
      explanation: 'Clustered determines row storage; non-clustered acts as a speedy lookup guide.'
    },
    keyTakeaways: [
      'Clustered index = 1 per table, physically reorders rows.',
      'Non-clustered index = multiple per table, separate B-tree pointing to table rows.',
      'Always index columns frequently used in WHERE, JOIN, and ORDER BY clauses.'
    ],
    companyTags: ['Microsoft', 'Capgemini', 'CTS'],
    difficulty: 'Medium'
  },
  {
    id: 86,
    questionNumber: 86,
    category: 'SQL',
    title: 'WHAT IS THE DIFFERENCE BETWEEN STORED PROCEDURE AND FUNCTIONS?',
    shortSummary: 'Stored Procedures perform operations and may return multiple/no values and use transactions; User-Defined Functions must return a value and can be used directly in SELECT statements.',
    detailedPoints: [
      '1. Return Value: A Stored Procedure may or may not return a value (can return 0, 1, or multiple result sets); A Function MUST always return a single value or table.',
      '2. Usage in SELECT: Functions can be directly invoked in SQL statements (`SELECT dbo.CalculateTax(Salary) FROM Emp`); Stored Procedures CANNOT be used in SELECT/WHERE.',
      '3. Transactions & DML: Procedures can use transactions, try/catch exception handling, and insert/update/delete; Functions cannot perform modifications on database state.',
      '4. Calling: A Procedure can call a Function, but a Function cannot call a Stored Procedure.'
    ],
    codeSnippet: {
      language: 'sql',
      code: `-- Stored Procedure (Handles transactions and outputs)
CREATE PROCEDURE proc_GetEmployee
    @DeptId int,
    @TotalCount int OUTPUT
AS
BEGIN
    SELECT * FROM Employees WHERE DepartmentID = @DeptId;
    SELECT @TotalCount = COUNT(*) FROM Employees WHERE DepartmentID = @DeptId;
END;

-- Function (Calculates and returns single value)
CREATE FUNCTION fn_GetBonus (@Salary decimal(18,2))
RETURNS decimal(18,2)
AS
BEGIN
    RETURN @Salary * 0.10;
END;`,
      explanation: 'Use functions for reusable calculations; use stored procedures for transactional workflows.'
    },
    keyTakeaways: [
      'Procedures handle business workflows and DML changes.',
      'Functions are deterministic calculations usable in queries.',
      'Procedures support input and output parameters and error handling.'
    ],
    companyTags: ['Infosys', 'TCS', 'Wipro'],
    difficulty: 'Medium'
  },
  {
    id: 90,
    questionNumber: 90,
    category: 'SQL',
    title: 'WHAT IS CTE IN SQL SERVER? WHAT ARE ITS ADVANTAGES?',
    shortSummary: 'A Common Table Expression (CTE) is a temporary named result set defined with `WITH` that improves query readability and enables recursive queries.',
    detailedPoints: [
      'A Common Table Expression (CTE) is a temporary named result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement.',
      'Key Advantages:',
      '1. Readability: Replaces deeply nested subqueries with clean, sequential logical blocks.',
      '2. Recursion: CTEs can reference themselves, making them ideal for hierarchical trees (e.g. employee org charts, categories).',
      '3. Maintainability: Can be referenced multiple times within the subsequent query.'
    ],
    codeSnippet: {
      language: 'sql',
      code: `WITH EmployeeCTE AS
(
    SELECT EmployeeId, FirstName, Salary, DepartmentID
    FROM Employees
    WHERE Salary > 50000
)
SELECT FirstName, Salary 
FROM EmployeeCTE
WHERE DepartmentID = 10;`,
      explanation: 'The CTE is defined with WITH and consumed immediately by the query below.'
    },
    keyTakeaways: [
      'Defined with the `WITH` keyword.',
      'Scope is limited to the single execution statement immediately following it.',
      'Supports recursive queries for hierarchical data structures.'
    ],
    companyTags: ['Microsoft', 'Tech Mahindra'],
    difficulty: 'Medium'
  },
  {
    id: 91,
    questionNumber: 91,
    category: 'SQL',
    title: 'WHAT IS THE DIFFERENCE BETWEEN DELETE, TRUNCATE AND DROP COMMANDS?',
    shortSummary: 'DELETE is DML (removes rows, logs each row, rollbackable); TRUNCATE is DDL (deallocates pages, resets identity); DROP is DDL (deletes table structure).',
    detailedPoints: [
      '1. Category: DELETE is DML (Data Manipulation); TRUNCATE and DROP are DDL (Data Definition).',
      '2. Scope: DELETE removes specific rows matching WHERE clause; TRUNCATE removes ALL rows in the table; DROP deletes all rows AND the entire table structure/schema.',
      '3. Logging & Performance: DELETE logs each deleted row individually (slow for big tables); TRUNCATE deallocates data pages (minimal logging, fast); DROP removes schema from catalog.',
      '4. Identity Reset: TRUNCATE resets table `IDENTITY` counter back to seed; DELETE does not reset identity.'
    ],
    codeSnippet: {
      language: 'sql',
      code: `-- DELETE: Row by row, WHERE clause supported
DELETE FROM Employees WHERE DepartmentID = 7;

-- TRUNCATE: Fast, all rows removed, identity reset, table remains
TRUNCATE TABLE Employees;

-- DROP: Table completely obliterated from database catalog
DROP TABLE Employees;`,
      explanation: 'TRUNCATE is fast because it deallocates pages instead of logging row deletions.'
    },
    keyTakeaways: [
      'DELETE = DML, WHERE clause allowed, row-level logging.',
      'TRUNCATE = DDL, fast page deallocation, resets identity, cannot have WHERE.',
      'DROP = DDL, completely destroys table and schema.'
    ],
    companyTags: ['TCS', 'Infosys', 'Accenture'],
    difficulty: 'Easy'
  },
  {
    id: 92,
    questionNumber: 92,
    category: 'SQL',
    title: 'HOW TO GET THE NTH HIGHEST SALARY OF AN EMPLOYEE?',
    shortSummary: 'Find Nth highest salary using DENSE_RANK() window function or nested TOP / subquery.',
    detailedPoints: [
      'This is one of the most frequently asked query questions in tech interviews!',
      'Method 1 (Modern & Best): Using `DENSE_RANK()` window function with a CTE. Handles duplicates correctly.',
      'Method 2: Using subquery with `ORDER BY DESC` and `OFFSET / FETCH NEXT`.',
      'Method 3: Classic correlated subquery.'
    ],
    codeSnippet: {
      language: 'sql',
      code: `-- Method 1: Using DENSE_RANK() (Recommended)
WITH SalaryRankCTE AS (
    SELECT 
        FirstName, 
        Salary, 
        DENSE_RANK() OVER (ORDER BY Salary DESC) as RankNum
    FROM Employees
)
SELECT FirstName, Salary 
FROM SalaryRankCTE 
WHERE RankNum = 3; -- For 3rd highest salary

-- Method 2: Modern OFFSET / FETCH (SQL Server 2012+)
SELECT DISTINCT Salary 
FROM Employees 
ORDER BY Salary DESC 
OFFSET 2 ROWS FETCH NEXT 1 ROWS ONLY;`,
      explanation: 'DENSE_RANK handles ties gracefully without skipping rank positions.'
    },
    keyTakeaways: [
      'Prefer DENSE_RANK() over RANK() to avoid skipping numbers on duplicate salaries.',
      'OFFSET / FETCH is simple and performant for pagination.',
      'Always use DISTINCT to ensure salaries are unique ranks.'
    ],
    companyTags: ['Microsoft', 'Infosys', 'Amazon', 'Accenture'],
    difficulty: 'Medium'
  },
  {
    id: 95,
    questionNumber: 95,
    category: '.NET Framework',
    title: 'WHAT IS MVC (MODEL VIEW CONTROLLER)? EXPLAIN MVC LIFE CYCLE.',
    shortSummary: 'MVC divides an app into Model (data/business rules), View (UI presentation), and Controller (request router and orchestrator).',
    detailedPoints: [
      'MVC is an architectural pattern for building web applications:',
      '• Model: Represents application data, business logic, and validation rules.',
      '• View: Displays the visual presentation (HTML/Razor) of model data to the user.',
      '• Controller: Handles incoming HTTP requests, invokes business logic/models, and selects appropriate views to render.',
      'Request Life Cycle in ASP.NET MVC:',
      '1. Routing: Incoming HTTP request is parsed by URL Routing engine to identify Controller and Action.',
      '2. Controller Creation: Controller factory instantiates the target controller.',
      '3. Action Execution: Action invoker runs authorization/action filters and executes the controller action method.',
      '4. Result Execution: Action returns an ActionResult (e.g. ViewResult), which is rendered by the View Engine (Razor) into HTML response.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `public class HomeController : Controller
{
    private readonly IProductService _productService;
    public HomeController(IProductService productService)
    {
        _productService = productService;
    }

    // Action Method
    public IActionResult Index()
    {
        // 1. Fetch Model Data
        var products = _productService.GetActiveProducts();

        // 2. Pass Model to View
        return View(products);
    }
}`,
      explanation: 'The controller bridges request input and delegates to Model and View.'
    },
    diagram: {
      type: 'mvc-lifecycle',
      title: 'MVC Request & Response Flow'
    },
    keyTakeaways: [
      'Clean Separation of Concerns (SoC).',
      'Testability: Controllers can be unit tested without loading UI.',
      'Independent development of frontend views and backend logic.'
    ],
    companyTags: ['Microsoft', 'Infosys', 'Cognizant'],
    difficulty: 'Easy'
  },
  {
    id: 97,
    questionNumber: 97,
    category: '.NET Framework',
    title: 'WHAT ARE THE DIFFERENT RETURN TYPES OF A CONTROLLER ACTION METHOD?',
    shortSummary: 'Action methods return subtypes of ActionResult: ViewResult, PartialViewResult, JsonResult, ContentResult, RedirectResult, and FileResult.',
    detailedPoints: [
      'Action methods return `ActionResult` or `IActionResult` types:',
      '1. ViewResult (`return View()`): Renders a complete HTML web page from a view file.',
      '2. PartialViewResult (`return PartialView()`): Renders a reusable fragment of HTML without master layout.',
      '3. JsonResult (`return Json(data)`): Serializes data into a JSON response (ideal for AJAX).',
      '4. RedirectResult (`return Redirect(url)`): Redirects browser to a specified URL (HTTP 302).',
      '5. RedirectToActionResult (`return RedirectToAction("Index")`): Redirects to another controller action.',
      '6. ContentResult (`return Content("text")`): Returns plain text or custom MIME content.',
      '7. FileResult (`return File(bytes, contentType)`): Downloads or streams a binary file.',
      '8. EmptyResult: Returns HTTP 200 with an empty body.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `public class DemoController : Controller
{
    public IActionResult GetPage() => View();
    public IActionResult GetFragment() => PartialView("_UserCard");
    public IActionResult GetData() => Json(new { Status = "Success", Code = 200 });
    public IActionResult GetFile() => File(fileBytes, "application/pdf", "report.pdf");
    public IActionResult Forward() => RedirectToAction("Index", "Home");
}`,
      explanation: 'IActionResult provides polymorphic response formats.'
    },
    keyTakeaways: [
      'Base interface is IActionResult (in ASP.NET Core) or ActionResult (in MVC 5).',
      'Enables clean unit testing of action responses.',
      'Supports JSON, HTML, redirect, file streaming, and status codes.'
    ],
    companyTags: ['TCS', 'Wipro', 'Accenture'],
    difficulty: 'Medium'
  },
  {
    id: 98,
    questionNumber: 98,
    category: '.NET Framework',
    title: 'WHAT ARE FILTERS AND THEIR TYPES IN MVC?',
    shortSummary: 'Filters are custom attributes that inject cross-cutting logic before or after action execution: Authorization, Action, Result, and Exception filters.',
    detailedPoints: [
      'Filters are attributes applied to actions or controllers to handle cross-cutting concerns.',
      'The 4 Main Filter Types in Order of Execution:',
      '1. Authorization Filters (`IAuthorizationFilter`): Runs first to verify user credentials and roles (e.g. `[Authorize]`).',
      '2. Action Filters (`IActionFilter`): Runs before and after the action method executes (`OnActionExecuting`, `OnActionExecuted`).',
      '3. Result Filters (`IResultFilter`): Runs before and after the ActionResult executes (e.g. `[OutputCache]`).',
      '4. Exception Filters (`IExceptionFilter`): Runs if an unhandled exception occurs in the pipeline (e.g. `[HandleError]`).'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `[Authorize(Roles = "Admin")] // Authorization Filter
public class AdminController : Controller
{
    [ServiceFilter(typeof(AuditLogActionFilter))] // Action Filter
    [ResponseCache(Duration = 60)]                // Result Filter
    public IActionResult Dashboard()
    {
        return View();
    }
}`,
      explanation: 'Filters execute in strict pipeline order: Auth -> Action -> Result -> Exception.'
    },
    keyTakeaways: [
      'Enforces DRY across controllers.',
      'Executed automatically in pipeline order.',
      'Can be registered globally, per controller, or per action.'
    ],
    companyTags: ['Microsoft', 'Infosys'],
    difficulty: 'Medium'
  },
  {
    id: 102,
    questionNumber: 102,
    category: '.NET Framework',
    title: 'WHAT IS THE DIFFERENCE BETWEEN VIEWDATA, VIEWBAG & TEMPDATA?',
    shortSummary: 'ViewData is a dictionary and ViewBag is a dynamic wrapper for Controller-to-View data; TempData persists data across redirects via session.',
    detailedPoints: [
      '1. ViewData: Dictionary of objects (`ViewDataDictionary`). Transfers data from Controller to View for the current request. Requires TYPECASTING for complex objects and checks for null.',
      '2. ViewBag: Dynamic property wrapper around ViewData (`dynamic`). Also passes data from Controller to View for the current request. DOES NOT require typecasting.',
      '3. TempData: Backed by Session storage (`ITempDataProvider`). Passes data from Controller to Controller across HTTP redirects. Destroyed once read unless `Keep()` or `Peek()` is called.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `public IActionResult Submit(OrderModel order)
{
    // ViewData (Dictionary)
    ViewData["Message"] = "Order Received";

    // ViewBag (Dynamic wrapper over ViewData)
    ViewBag.TotalAmount = 2500;

    // TempData (Persists across HTTP 302 Redirect!)
    TempData["Notification"] = "Order #102 created successfully";

    return RedirectToAction("Confirmation");
}`,
      explanation: 'TempData survives the redirect to Confirmation action; ViewData and ViewBag are cleared.'
    },
    keyTakeaways: [
      'ViewData and ViewBag share the same internal dictionary for the current request.',
      'TempData persists across redirects and is cleared after reading.',
      'Prefer strongly-typed ViewModel objects over all three in modern apps.'
    ],
    companyTags: ['TCS', 'Infosys', 'Accenture', 'Capgemini'],
    difficulty: 'Easy'
  },
  {
    id: 111,
    questionNumber: 111,
    category: '.NET Framework',
    title: 'WHAT IS THE DIFFERENCE BETWEEN SERVER.TRANSFER() AND RESPONSE.REDIRECT()?',
    shortSummary: 'Response.Redirect instructs the browser to make a new HTTP request (round trip, updates URL); Server.Transfer moves execution internally on the server (no round trip, URL stays same).',
    detailedPoints: [
      '1. Round Trip:',
      '   • `Response.Redirect`: Sends HTTP 302 redirect response back to client browser, which then issues a second GET request to the target page. Causes extra round trip.',
      '   • `Server.Transfer`: Transits execution directly to the new page on the server without communicating back to the client. Faster execution.',
      '2. Browser URL & History: `Response.Redirect` updates the browser address bar; `Server.Transfer` keeps the original URL in the address bar.',
      '3. Cross-Domain: `Response.Redirect` can redirect to external websites; `Server.Transfer` can ONLY transfer within the same application/server.'
    ],
    keyTakeaways: [
      'Response.Redirect = Client-side redirection with URL update.',
      'Server.Transfer = Server-side internal execution transfer.',
      'Use Response.Redirect when you want the browser URL to reflect the new resource.'
    ],
    companyTags: ['Wipro', 'Tech Mahindra'],
    difficulty: 'Easy'
  }
];
