import { InterviewQuestion } from '../types';

export const questionsPart4: InterviewQuestion[] = [
  {
    id: 144,
    questionNumber: 144,
    category: 'Web API',
    title: 'WHAT IS WEB API? WHAT IS THE PURPOSE OF WEB API?',
    shortSummary: 'Web API is an HTTP-based service framework providing cross-platform machine-to-machine communication over standard HTTP verbs.',
    detailedPoints: [
      'Web API (Application Programming Interface) provides interaction BETWEEN two software applications for building HTTP-based services.',
      'It allows communication between different applications or client devices using standard HTTP protocols (GET, POST, PUT, DELETE).',
      'It is cross-platform: can be consumed by Web browsers, Mobile apps (iOS/Android), Desktop apps, and IoT devices.',
      'Centralizes Business Logic: Amazon or banking applications have different UIs (iOS app, Android app, web portal), but their core business logic resides in a centralized Web API, ensuring unified validation, transactions, and maintainability.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetProducts()
    {
        return Ok(new List<Product> { new Product { Id = 1, Name = "Laptop" } });
    }

    [HttpPost]
    public ActionResult<Product> CreateProduct([FromBody] Product product)
    {
        // Business logic & save
        return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, product);
    }
}`,
      explanation: 'Exposes HTTP endpoints reachable by any HTTP client worldwide.'
    },
    keyTakeaways: [
      'Built on HTTP protocol using standard verbs.',
      'Cross-platform and device agnostic.',
      'Decouples client presentation from server business logic.'
    ],
    companyTags: ['Microsoft', 'Infosys', 'TCS', 'Amazon'],
    difficulty: 'Easy'
  },
  {
    id: 146,
    questionNumber: 146,
    category: 'Web API',
    title: 'WHAT IS REST AND RESTFUL?',
    shortSummary: 'REST (Representational State Transfer) is an architectural style for networked systems characterized by 6 core architectural constraints.',
    detailedPoints: [
      'REST stands for Representational State Transfer. A system adhering to REST constraints is termed RESTful.',
      'The 6 Core REST Constraints:',
      '1. Client-Server Separation: User interface is decoupled from data storage and server logic.',
      '2. Statelessness: Each request from client to server must contain all necessary info to understand the request; server holds no client session state.',
      '3. Cacheability: Responses must implicitly or explicitly define themselves as cacheable or non-cacheable to improve network performance.',
      '4. Uniform Interface: Standard URI resource identifiers, manipulation through representations (JSON/XML), self-descriptive messages, and HATEOAS.',
      '5. Layered System: Intermediaries (proxies, load balancers, gateways) can be inserted transparently.',
      '6. Code on Demand (Optional): Server can temporarily extend client functionality (e.g. scripts).'
    ],
    keyTakeaways: [
      'REST is an architectural pattern, not a protocol.',
      'Statelessness ensures horizontal scalability behind load balancers.',
      'Standard HTTP verbs represent operations on resources.'
    ],
    companyTags: ['Microsoft', 'Google', 'Accenture'],
    difficulty: 'Medium'
  },
  {
    id: 155,
    questionNumber: 155,
    category: 'Web API',
    title: 'WHAT IS JWT AUTHENTICATION? WHAT ARE THE PARTS OF A JWT TOKEN?',
    shortSummary: 'JSON Web Token (JWT) is a compact, URL-safe standard (RFC 7519) consisting of Header, Payload, and Signature.',
    detailedPoints: [
      'JWT authentication is a stateless, token-based authentication mechanism where server issues a cryptographically signed token after user login.',
      'The client stores this token and passes it in the `Authorization: Bearer <token>` header with subsequent HTTP requests.',
      'A JWT consists of 3 dot-separated Base64Url-encoded sections: `Header.Payload.Signature`',
      '1. Header: Specifies the token type (`"typ": "JWT"`) and signing algorithm (`"alg": "HS256"` or `"RS256"`).',
      '2. Payload: Contains the CLAIMS (user id, email, roles, expiration `exp`, issuer `iss`).',
      '3. Signature: Cryptographic hash produced by signing `Base64(Header) + "." + Base64(Payload)` with a secret key or private key. Verifies message integrity.'
    ],
    codeSnippet: {
      language: 'text',
      code: `// Structure of a JWT Token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  // 1. Header (Algorithm & Token Type)
eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiQW5raXQiLCJyb2xlIjoiQWRtaW4ifQ. // 2. Payload (Claims)
TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ  // 3. Signature (Tamper-proof Verification)`,
      explanation: 'Signature ensures that any alteration to Header or Payload invalidates the token.'
    },
    diagram: {
      type: 'jwt-anatomy',
      title: 'Anatomy of a JSON Web Token (JWT)'
    },
    keyTakeaways: [
      'Stateless: Server verifies signature without querying session database.',
      '3 parts: Header, Payload (Claims), Signature.',
      'Passed in the `Authorization: Bearer <token>` HTTP header.'
    ],
    companyTags: ['Microsoft', 'Amazon', 'Accenture', 'Infosys'],
    difficulty: 'Medium'
  },
  {
    id: 157,
    questionNumber: 157,
    category: 'Web API',
    title: 'WHERE DOES THE JWT TOKEN RESIDE IN AN HTTP REQUEST?',
    shortSummary: 'In the HTTP Request Header under the `Authorization` key formatted as `Bearer <token>`.',
    detailedPoints: [
      'The token resides in the HTTP REQUEST HEADER.',
      'Key: `Authorization`',
      'Value: `Bearer <jwt_token_string>`',
      'In tools like Postman, you select Authorization tab -> Type: Bearer Token -> paste the JWT token.',
      'ASP.NET Core extracts this automatically using `app.UseAuthentication()` with JWT Bearer middleware.'
    ],
    codeSnippet: {
      language: 'http',
      code: `GET /api/orders HTTP/1.1
Host: api.myshop.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json`,
      explanation: 'The server middleware parses the Bearer token and creates a ClaimsPrincipal.'
    },
    keyTakeaways: [
      'Sent via `Authorization: Bearer <token>` header.',
      'Avoids cookies for cross-domain mobile & API microservice clients.',
      'Must always be transmitted over HTTPS to prevent packet sniffing.'
    ],
    companyTags: ['Microsoft', 'Infosys'],
    difficulty: 'Easy'
  },
  {
    id: 164,
    questionNumber: 164,
    category: '.NET Core',
    title: 'WHAT IS .NET CORE? WHAT ARE ITS ADVANTAGES OVER .NET FRAMEWORK?',
    shortSummary: '.NET Core is Microsoft\'s open-source, cross-platform, modular, and high-performance runtime for cloud and microservices.',
    detailedPoints: [
      '.NET Core is a complete redesign of the legacy .NET Framework:',
      '1. Cross-Platform: Runs seamlessly on Windows, Linux, and macOS (legacy .NET Framework was Windows only).',
      '2. Open-Source: Managed on GitHub with vibrant community contributions.',
      '3. High Performance: Drastically faster execution, lower memory footprint, and top rank in TechEmpower benchmarks.',
      '4. Built-in Dependency Injection: DI container is integrated into the core runtime without requiring third-party libraries.',
      '5. Modular & Lightweight: Distributed via NuGet packages; apps package only what they use.',
      '6. Side-by-Side Versioning: Multiple versions of .NET Core can run concurrently on the same machine without conflicts.'
    ],
    diagram: {
      type: 'service-lifetimes',
      title: '.NET Architecture Evolution'
    },
    keyTakeaways: [
      'Cross-platform: Windows, Linux, Docker containers, macOS.',
      'Side-by-side installations without breaking system libraries.',
      'Built for cloud-native microservices and container deployments.'
    ],
    companyTags: ['Microsoft', 'Infosys', 'TCS', 'Amazon'],
    difficulty: 'Easy'
  },
  {
    id: 177,
    questionNumber: 177,
    category: '.NET Core',
    title: 'WHAT ARE THE TYPES OF SERVICE LIFETIMES IN ASP.NET CORE DEPENDENCY INJECTION?',
    shortSummary: 'Transient (new instance every time), Scoped (one instance per HTTP request), and Singleton (one instance for entire app lifetime).',
    detailedPoints: [
      'ASP.NET Core DI provides 3 distinct service lifetimes registered in `ConfigureServices` / `Program.cs`:',
      '1. Transient (`AddTransient<TService, TImpl>()`):',
      '   • A brand new instance is created EVERY TIME it is requested.',
      '   • Best for lightweight, stateless services.',
      '2. Scoped (`AddScoped<TService, TImpl>()`):',
      '   • Created ONCE PER HTTP REQUEST. The same instance is shared across all controllers and services within that individual web request.',
      '   • Best for services holding request-specific state, such as Entity Framework `DbContext`.',
      '3. Singleton (`AddSingleton<TService, TImpl>()`):',
      '   • Created ONCE during first request or startup and reused for the ENTIRE LIFETIME of the application.',
      '   • Best for caching, memory storage, and thread-safe shared singletons.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `var builder = WebApplication.CreateBuilder(args);

// 1. Transient: Fresh instance every injection
builder.Services.AddTransient<IEmailSender, EmailSender>();

// 2. Scoped: Same instance per HTTP request (ideal for DbContext)
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddDbContext<AppDbContext>();

// 3. Singleton: Single shared instance for app lifespan
builder.Services.AddSingleton<ICacheService, MemoryCacheService>();`,
      explanation: 'Captive Dependency Warning: Never inject a Scoped service into a Singleton service!'
    },
    diagram: {
      type: 'service-lifetimes',
      title: 'Transient vs Scoped vs Singleton Lifetimes'
    },
    keyTakeaways: [
      'Transient = New object per request call.',
      'Scoped = Single object shared per HTTP request.',
      'Singleton = Single object shared across the entire application.',
      'Captive Dependency: A singleton holding a scoped service causes memory leaks.'
    ],
    companyTags: ['Microsoft', 'Accenture', 'Infosys', 'Wipro'],
    difficulty: 'Medium'
  },
  {
    id: 179,
    questionNumber: 179,
    category: '.NET Core',
    title: 'WHAT IS MIDDLEWARE IN ASP.NET CORE? EXPLAIN RUN(), USE(), AND MAP().',
    shortSummary: 'Middleware are software components assembled into an application pipeline to handle requests and responses in sequential order.',
    detailedPoints: [
      'Middleware is software that is assembled into an HTTP request processing pipeline.',
      'Each middleware component either handles the request or passes it to the next middleware via `next()`.',
      'Pipeline Methods:',
      '1. `app.Use()`: Executes logic and calls `await next()` to invoke the next middleware in sequence.',
      '2. `app.Run()`: Terminal middleware. It executes logic and TERMINATES the pipeline (never calls `next()`).',
      '3. `app.Map()`: Branches the pipeline based on the request URL path (e.g. `app.Map("/api", ...)`).'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `var app = builder.Build();

// 1. Use: Passes to next
app.Use(async (context, next) =>
{
    Console.WriteLine("Request Incoming");
    await next(); // Proceed to next middleware
    Console.WriteLine("Response Outgoing");
});

// 2. Map: Branching
app.Map("/health", branch =>
{
    branch.Run(async context => await context.Response.WriteAsync("Healthy"));
});

// 3. Run: Terminal
app.Run();`,
      explanation: 'Requests flow through middleware in the order they are defined and return in reverse order.'
    },
    diagram: {
      type: 'middleware-pipeline',
      title: 'ASP.NET Core Middleware Request/Response Pipeline'
    },
    keyTakeaways: [
      'Order of registration strictly determines execution order.',
      'Use = Sequential with next delegation.',
      'Run = Terminal endpoint.',
      'Map = Path-based pipeline branching.'
    ],
    companyTags: ['Microsoft', 'Infosys', 'Cognizant'],
    difficulty: 'Medium'
  },
  {
    id: 185,
    questionNumber: 185,
    category: '.NET Core',
    title: 'WHAT IS KESTREL? WHAT IS THE DIFFERENCE BETWEEN KESTREL AND IIS?',
    shortSummary: 'Kestrel is a cross-platform, high-performance web server built into ASP.NET Core; IIS is a Windows-only enterprise management web server.',
    detailedPoints: [
      '• Kestrel: Cross-platform, lightweight, high-performance HTTP web server included by default in ASP.NET Core templates. Runs on Windows, Linux, and macOS.',
      '• IIS (Internet Information Services): Full-featured Windows-only web server offering process activation, certificate management, security filtering, and URL rewrites.',
      'Deployment Architecture:',
      'Kestrel can be used directly as an edge server or placed behind a reverse proxy (IIS on Windows, Nginx or Apache on Linux) for advanced features like SSL offloading and port sharing.'
    ],
    keyTakeaways: [
      'Kestrel = Cross-platform, lightweight, high-throughput.',
      'IIS = Windows-only, rich management and process hosting.',
      'Reverse proxy setup: Internet -> IIS/Nginx (Port 80/443) -> Kestrel (Internal Port).'
    ],
    companyTags: ['Microsoft', 'TCS'],
    difficulty: 'Medium'
  },
  {
    id: 196,
    questionNumber: 196,
    category: '.NET Core',
    title: 'WHAT IS CORS IN ASP.NET CORE? HOW TO FIX CORS ERRORS?',
    shortSummary: 'CORS (Cross-Origin Resource Sharing) is a browser security standard preventing scripts on one origin from accessing resources on another origin.',
    detailedPoints: [
      'CORS is a browser security mechanism that restricts web pages from making AJAX requests to a different domain, subdomain, protocol (HTTP vs HTTPS), or port.',
      'If your React frontend runs on `http://localhost:3000` and requests an API on `http://localhost:5000`, the browser blocks it unless the server responds with CORS approval headers.',
      'How to Fix in ASP.NET Core:',
      '1. Add CORS services in `Program.cs` via `builder.Services.AddCors(...)`.',
      '2. Enable CORS middleware via `app.UseCors("MyCorsPolicy")` placed between `UseRouting()` and `UseAuthorization()`.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://myapp.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseRouting();
app.UseCors("AllowFrontend"); // Must be after UseRouting and before UseAuthorization
app.UseAuthorization();`,
      explanation: 'Server sends Access-Control-Allow-Origin headers in preflight OPTIONS requests.'
    },
    keyTakeaways: [
      'CORS is enforced strictly by the CLIENT BROWSER, not by the server.',
      '`app.UseCors()` order matters: place between UseRouting and UseAuthorization.',
      'Never use `.AllowAnyOrigin()` together with `.AllowCredentials()` (forbidden by browser spec).'
    ],
    companyTags: ['Microsoft', 'Infosys', 'Accenture'],
    difficulty: 'Medium'
  },
  {
    id: 201,
    questionNumber: 201,
    category: 'JavaScript',
    title: 'EXPLAIN CLOSURES IN JAVASCRIPT WITH REAL-WORLD USE CASES.',
    shortSummary: 'A closure is the combination of a function bundled together with references to its surrounding lexical environment.',
    detailedPoints: [
      'A closure gives an inner function access to an outer function\'s scope even after the outer function has finished executing and returned.',
      'In JavaScript, functions retain a reference to their enclosing lexical scope.',
      'Real-World Use Cases:',
      '1. Data Privacy / Emulating Private Variables (Encapsulation).',
      '2. Function Factories (e.g. creating multiplier functions).',
      '3. Currying and Partial Application.',
      '4. Maintaining state in asynchronous callbacks and debounce / throttle utilities.'
    ],
    codeSnippet: {
      language: 'javascript',
      code: `function createCounter() {
    let count = 0; // Private variable enclosed in lexical scope
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.count);       // undefined (private!)`,
      explanation: 'The returned methods hold a reference to `count` via closure.'
    },
    keyTakeaways: [
      'Inner function retains access to outer lexical environment.',
      'Enables true private variables in JavaScript modules.',
      'Be mindful of memory retention if holding large variables in scope.'
    ],
    companyTags: ['Google', 'Meta', 'Microsoft'],
    difficulty: 'Medium'
  },
  {
    id: 202,
    questionNumber: 202,
    category: 'JavaScript',
    title: 'HOW DOES THE JAVASCRIPT EVENT LOOP WORK? (CALL STACK, MICROTASK, MACROTASK)',
    shortSummary: 'JavaScript is single-threaded; the Event Loop continuously coordinates execution between Call Stack, Microtask queue (Promises), and Macrotask queue (setTimeout).',
    detailedPoints: [
      'The Event Loop coordinates asynchronous execution in JavaScript:',
      '1. Call Stack: Synchronous code executes first on the single main thread LIFO stack.',
      '2. Web APIs: Background operations (DOM events, fetch, setTimeout) are delegated to the browser/Node runtime.',
      '3. Microtask Queue: Highest priority asynchronous tasks (`Promise.then`, `queueMicrotask`, `MutationObserver`). The event loop drains the entire microtask queue before rendering or touching macrotasks.',
      '4. Macrotask Queue (Task Queue): Lower priority (`setTimeout`, `setInterval`, `setImmediate`, I/O). Executed one per tick after microtasks finish.'
    ],
    codeSnippet: {
      language: 'javascript',
      code: `console.log("1. Synchronous");

setTimeout(() => console.log("2. Macrotask (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3. Microtask (Promise)"));

console.log("4. Synchronous end");

// Output Order:
// 1. Synchronous
// 4. Synchronous end
// 3. Microtask (Promise)
// 2. Macrotask (setTimeout)`,
      explanation: 'Microtasks (Promises) always execute before macrotasks (setTimeout).'
    },
    keyTakeaways: [
      'Call Stack executes first until empty.',
      'Microtasks (Promises) are drained completely before macrotasks.',
      'Macrotasks execute one per event loop cycle.'
    ],
    companyTags: ['Amazon', 'Microsoft', 'Uber'],
    difficulty: 'Hard'
  },
  {
    id: 203,
    questionNumber: 203,
    category: 'React',
    title: 'WHAT IS THE REACT VIRTUAL DOM AND HOW DOES RECONCILIATION WORK?',
    shortSummary: 'Virtual DOM is an in-memory representation of the real DOM; reconciliation uses heuristic diffing to batch and minimize real DOM mutations.',
    detailedPoints: [
      'Manipulating the real browser DOM is slow due to layout recalculations and repaints.',
      'Virtual DOM (VDOM) is a lightweight JavaScript tree representation of the actual DOM in memory.',
      'Reconciliation Process (React Fiber):',
      '1. Render Phase: When state changes, React renders a new virtual DOM tree.',
      '2. Diffing Heuristics: React compares the new tree with the previous snapshot using two key assumptions:',
      '   • Elements of different types produce different trees.',
      '   • Elements with unique `key` props identify stable child elements across renders.',
      '3. Commit Phase: React computes minimal patches and flushes them to the real DOM in a single batched mutation.'
    ],
    keyTakeaways: [
      'VDOM is a lightweight in-memory JavaScript representation.',
      'Diffing operates in O(n) heuristic time instead of traditional O(n³).',
      'Keys are crucial in lists to prevent unnecessary re-rendering and DOM destroys.'
    ],
    companyTags: ['Meta', 'Microsoft', 'Netflix'],
    difficulty: 'Medium'
  },
  {
    id: 204,
    questionNumber: 204,
    category: 'Azure',
    title: 'WHAT ARE AZURE APP SERVICES VS AZURE FUNCTIONS (SERVERLESS)?',
    shortSummary: 'Azure App Service is a PaaS platform for hosting full web applications; Azure Functions is an event-driven serverless compute service that scales to zero.',
    detailedPoints: [
      '• Azure App Service: Fully managed Platform as a Service (PaaS) for hosting enterprise web apps and APIs. Dedicated compute plans, custom domains, continuous deployment from GitHub.',
      '• Azure Functions: Serverless event-driven compute that executes small blocks of code in response to triggers (HTTP requests, Timer crons, Queue messages, CosmosDB mutations). Billed purely per execution with automatic scale-to-zero.'
    ],
    keyTakeaways: [
      'App Service = Dedicated web applications and long-running APIs.',
      'Azure Functions = Event-driven, pay-per-execution, serverless micro-tasks.',
      'Both integrate natively with Azure Key Vault and Application Insights.'
    ],
    companyTags: ['Microsoft', 'Accenture', 'Infosys'],
    difficulty: 'Medium'
  }
];
