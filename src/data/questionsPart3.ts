import { InterviewQuestion } from '../types';

export const questionsPart3: InterviewQuestion[] = [
  {
    id: 117,
    questionNumber: 117,
    category: 'Design Patterns', // Can be filtered or listed under ADO.NET / General
    title: 'WHAT ARE THE MAIN COMPONENTS OF ADO.NET?',
    shortSummary: 'ADO.NET provides data access via Connection, Command, DataReader (connected) and DataSet, DataAdapter, DataTable (disconnected).',
    detailedPoints: [
      'ADO.NET (ActiveX Data Objects .NET) is Microsoft\'s foundational data access technology.',
      'Core Components:',
      '1. Connection (SqlConnection): Establishes a physical session connection to the database server.',
      '2. Command (SqlCommand): Executes SQL statements, queries, or stored procedures.',
      '3. DataReader (SqlDataReader): Provides a high-performance, forward-only, read-only stream of rows directly from the server. Follows CONNECTED architecture.',
      '4. DataSet: An in-memory cache of relational tables, relationships, and constraints. Independent of database. Follows DISCONNECTED architecture.',
      '5. DataAdapter (SqlDataAdapter): Acts as a bidirectional bridge between the physical database and the in-memory DataSet via `Fill()` and `Update()`.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// ADO.NET Connected execution
using (SqlConnection conn = new SqlConnection(connectionString))
{
    conn.Open();
    using (SqlCommand cmd = new SqlCommand("SELECT Id, Name FROM Users", conn))
    {
        using (SqlDataReader reader = cmd.ExecuteReader())
        {
            while (reader.Read())
            {
                Console.WriteLine($"{reader["Id"]}: {reader["Name"]}");
            }
        }
    }
}`,
      explanation: 'DataReader streams rows one-by-one with low memory usage.'
    },
    keyTakeaways: [
      'DataReader = Fast, forward-only, read-only, connected.',
      'DataSet = In-memory relational database, disconnected.',
      'DataAdapter = Bridge between disconnected dataset and physical DB.'
    ],
    companyTags: ['TCS', 'Infosys', 'Wipro'],
    difficulty: 'Easy'
  },
  {
    id: 118,
    questionNumber: 118,
    category: 'Design Patterns',
    title: 'WHAT IS CONNECTED ARCHITECTURE AND DISCONNECTED ARCHITECTURE?',
    shortSummary: 'Connected architecture maintains an open DB connection while streaming data (DataReader); disconnected pulls data into RAM and closes the connection (DataAdapter/DataSet).',
    detailedPoints: [
      '1. Connected Architecture: The application maintains an open physical connection to the database during the entire data read process (e.g. `SqlDataReader`). Less memory usage, but ties up connection pool slots.',
      '2. Disconnected Architecture: The application connects briefly, pulls the dataset into RAM (`DataSet` / `DataTable` via `SqlDataAdapter.Fill()`), and IMMEDIATELY closes the connection. Changes are edited offline and pushed back using `DataAdapter.Update()`. Highly scalable for web apps.'
    ],
    keyTakeaways: [
      'Connected: SqlDataReader, faster read throughput, occupies connection.',
      'Disconnected: DataSet / DataAdapter, offline editing, scales better for web.'
    ],
    companyTags: ['TCS', 'Accenture', 'Cognizant'],
    difficulty: 'Easy'
  },
  {
    id: 121,
    questionNumber: 121,
    category: '.NET Core',
    title: 'WHAT IS ORM? WHAT ARE THE DIFFERENT TYPES OF ORM IN .NET?',
    shortSummary: 'Object-Relational Mapping maps relational database tables into C# classes, eliminating manual SQL string concatenation.',
    detailedPoints: [
      'ORM (Object-Relational Mapping) is a software technique that allows developers to interact with relational databases using strongly-typed programming objects instead of writing raw SQL queries.',
      'How ORM Maps Concepts:',
      '• Database Tables -> C# Classes',
      '• Table Rows -> C# Objects',
      '• Table Columns -> C# Properties',
      'Popular ORMs in the .NET Ecosystem:',
      '1. Entity Framework Core (EF Core): Microsoft\'s modern, lightweight, extensible, cross-platform ORM.',
      '2. Entity Framework 6.x (Classic EF for .NET Framework).',
      '3. Dapper: Ultra-fast micro-ORM created by Stack Overflow (raw SQL performance with automatic object mapping).',
      '4. NHibernate: Port of Java Hibernate for .NET.'
    ],
    keyTakeaways: [
      'Bridges the impedance mismatch between object-oriented code and relational tables.',
      'Provides query translation, change tracking, and migration capabilities.',
      'EF Core is full-featured; Dapper is a high-speed micro-ORM.'
    ],
    companyTags: ['Microsoft', 'Infosys', 'HCL'],
    difficulty: 'Easy'
  },
  {
    id: 122,
    questionNumber: 122,
    category: '.NET Core',
    title: 'WHAT IS ENTITY FRAMEWORK? EXPLAIN CODE-FIRST VS DATABASE-FIRST.',
    shortSummary: 'Entity Framework is Microsoft\'s primary ORM supporting Code-First (C# classes generate database schema) and Database-First (existing DB generates C# models).',
    detailedPoints: [
      'Entity Framework allows querying and persisting data using LINQ and strongly-typed objects.',
      'Key Approaches in Entity Framework:',
      '1. Code-First: Developer writes C# classes and DbContext first. EF Migrations generate and update the database schema automatically. Recommended for new applications.',
      '2. Database-First: Existing relational database schema is reverse-engineered into C# entity models and DbContext using `dotnet ef dbcontext scaffold`. Ideal for legacy databases.',
      '3. Model-First (legacy in EF6): Visual EDMX designer generated classes and database script.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// Code-First Entity
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

// DbContext
public class SchoolContext : DbContext
{
    public DbSet<Student> Students { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlServer("Server=.;Database=SchoolDb;Trusted_Connection=True;");
}`,
      explanation: 'EF Core maps Student entity to the Students database table.'
    },
    keyTakeaways: [
      'Code-First is the standard for modern development with EF Core migrations.',
      'Database-First is achieved via scaffolding for existing databases.',
      'DbContext manages connections, change tracking, and SQL compilation.'
    ],
    companyTags: ['Microsoft', 'TCS', 'Tech Mahindra'],
    difficulty: 'Medium'
  },
  {
    id: 128,
    questionNumber: 128,
    category: 'Design Patterns',
    title: 'WHAT ARE SOLID PRINCIPLES? WHAT IS THE DIFFERENCE BETWEEN SOLID AND DESIGN PATTERNS?',
    shortSummary: 'SOLID is an acronym for 5 fundamental object-oriented design principles that create maintainable, flexible, and testable architectures.',
    detailedPoints: [
      'SOLID stands for:',
      '• S: Single Responsibility Principle (SRP)',
      '• O: Open/Closed Principle (OCP)',
      '• L: Liskov Substitution Principle (LSP)',
      '• I: Interface Segregation Principle (ISP)',
      '• D: Dependency Inversion Principle (DIP)',
      'Difference between SOLID principles and Design Patterns:',
      '• SOLID principles are abstract philosophical guidelines and architectural best practices.',
      '• Design Patterns are concrete, repeatable solutions to specific design problems (like Singleton, Factory, Observer).'
    ],
    diagram: {
      type: 'solid-principles',
      title: 'The 5 SOLID Design Principles'
    },
    keyTakeaways: [
      'Principles are broad guidelines; patterns are concrete implementations.',
      'Applying SOLID minimizes technical debt and code rigidity.',
      'Core foundation for clean architecture and unit testability.'
    ],
    companyTags: ['Microsoft', 'Amazon', 'Google', 'Accenture', 'Infosys'],
    difficulty: 'Medium'
  },
  {
    id: 129,
    questionNumber: 129,
    category: 'Design Patterns',
    title: 'WHAT IS SINGLE RESPONSIBILITY PRINCIPLE (SRP)?',
    shortSummary: 'SRP states that a class should have one, and only one, reason to change (single well-defined responsibility).',
    detailedPoints: [
      'SRP: "A class should have one reason to change, meaning each class should have only one responsibility."',
      'Violating SRP: A class that generates a business report AND formats it into PDF AND saves it to disk AND emails it to users. It changes whenever reporting rules change, or PDF formatting changes, or email server changes!',
      'Adhering to SRP: Separate into `ReportGenerator`, `ReportSaver`, and `NotificationService`.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// Following SRP: Separate responsibilities
public class Report
{
    public string GenerateReportData() => "Report Data";
}

public class ReportSaver
{
    public void SaveToFile(string reportData, string path)
    {
        File.WriteAllText(path, reportData);
    }
}`,
      explanation: 'Report only changes for calculation rules; ReportSaver only changes for storage rules.'
    },
    keyTakeaways: [
      'One class = One distinct purpose.',
      'Reduces class coupling and makes code easier to unit test.',
      'Simplifies regression testing during business requirement changes.'
    ],
    companyTags: ['Microsoft', 'Infosys'],
    difficulty: 'Easy'
  },
  {
    id: 130,
    questionNumber: 130,
    category: 'Design Patterns',
    title: 'WHAT IS OPEN-CLOSED PRINCIPLE (OCP)?',
    shortSummary: 'Software entities should be open for extension, but closed for modification.',
    detailedPoints: [
      'Open for Extension: You should be able to add new behaviors or features easily.',
      'Closed for Modification: You should NOT have to alter existing tested source code or class internals to introduce new functionality.',
      'How to achieve: Use interfaces and abstract base classes. When a new requirement arrives (e.g. PayPal payment), create a new implementation class instead of adding `if-else` blocks in an existing class.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// Common interface
public interface IPaymentMethod
{
    void ProcessPayment(decimal amount);
}

// Concrete extensions without modifying existing code
public class CreditCardPayment : IPaymentMethod
{
    public void ProcessPayment(decimal amount) => Console.WriteLine($"Paid {amount} via Credit Card");
}

public class PayPalPayment : IPaymentMethod
{
    public void ProcessPayment(decimal amount) => Console.WriteLine($"Paid {amount} via PayPal");
}

// Consumer is closed for modification!
public class PaymentProcessor
{
    public void Checkout(IPaymentMethod paymentMethod, decimal amount)
    {
        paymentMethod.ProcessPayment(amount);
    }
}`,
      explanation: 'Adding Bitcoin payment requires zero changes to PaymentProcessor!'
    },
    keyTakeaways: [
      'Avoid long switch/case or if-else cascades on type tags.',
      'Extend behavior by adding new classes that implement existing interfaces.',
      'Guarantees backward compatibility and avoids breaking existing tests.'
    ],
    companyTags: ['Microsoft', 'Amazon', 'Accenture'],
    difficulty: 'Medium'
  },
  {
    id: 131,
    questionNumber: 131,
    category: 'Design Patterns',
    title: 'WHAT IS LISKOV SUBSTITUTION PRINCIPLE (LSP)?',
    shortSummary: 'Subtypes must be substitutable for their base types without altering the correctness of the program.',
    detailedPoints: [
      'LSP states: If S is a subtype of T, objects of type T may be replaced with objects of type S without breaking functionality.',
      'Violation Example: A base class `Bird` with method `Fly()`. If you derive `Ostrich` and throw `NotSupportedException` in `Fly()`, any code expecting a `Bird` will crash when given an `Ostrich`. This breaks LSP!',
      'Resolution: Only place methods in base classes that all derived classes can genuinely fulfill (e.g. `Move()`, or separate `IFlyable`).'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// Violating LSP:
public class Employee
{
    public virtual decimal CalculateSalary() => 50000;
    public virtual decimal CalculateBonus() => 25000;
}

public class ContractEmployee : Employee
{
    // Violation: Contract workers do not get bonus!
    public override decimal CalculateBonus() 
        => throw new NotImplementedException("Contractors have no bonus!"); // VIOLATES LSP!
}

// Fix: Extract bonus to an interface IBonusEligible`,
      explanation: 'Subclasses must honor the contract established by the parent without throwing NotImplementedException.'
    },
    keyTakeaways: [
      'Derived classes should not weaken base class preconditions.',
      'Throwing `NotImplementedException` in overridden methods is a red flag.',
      'Model behavior according to capability, not real-world taxonomy.'
    ],
    companyTags: ['Microsoft', 'Cognizant', 'HCL'],
    difficulty: 'Hard'
  },
  {
    id: 132,
    questionNumber: 132,
    category: 'Design Patterns',
    title: 'WHAT IS INTERFACE SEGREGATION PRINCIPLE (ISP)?',
    shortSummary: 'Clients should not be forced to depend on interfaces they do not use (prefer small, cohesive interfaces over fat interfaces).',
    detailedPoints: [
      'ISP states: Do not create bloated, monolithic interfaces with dozens of methods. Break them down into smaller, role-specific interfaces.',
      'Example: Instead of one fat interface `IVehicle` containing `Drive()` and `Fly()`, create `IDriveable` and `IFlyable`.',
      'A normal `Car` implements only `IDriveable`. A `FlyingCar` implements both `IDriveable` and `IFlyable`.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// BAD: Fat interface forcing unused methods
public interface IVehicle
{
    void Drive();
    void Fly(); // Car doesn't fly!
}

// GOOD: Segregated interfaces
public interface IDriveable { void Drive(); }
public interface IFlyable { void Fly(); }

public class Car : IDriveable
{
    public void Drive() => Console.WriteLine("Driving car");
}

public class FlyingCar : IDriveable, IFlyable
{
    public void Drive() => Console.WriteLine("Driving flying car");
    public void Fly() => Console.WriteLine("Flying in sky");
}`,
      explanation: 'Clients implement only what they actually support.'
    },
    keyTakeaways: [
      'Many client-specific interfaces are better than one general-purpose interface.',
      'Keeps implementations lightweight and cohesive.',
      'Interfaces should be designed from the client\'s perspective.'
    ],
    companyTags: ['Microsoft', 'Infosys', 'TCS'],
    difficulty: 'Medium'
  },
  {
    id: 133,
    questionNumber: 133,
    category: 'Design Patterns',
    title: 'WHAT IS DEPENDENCY INVERSION PRINCIPLE (DIP)?',
    shortSummary: 'High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces).',
    detailedPoints: [
      'DIP states:',
      '1. High-level business logic must not depend directly on low-level data access / infrastructure modules. Both must depend on abstractions.',
      '2. Abstractions should not depend on details; details should depend on abstractions.',
      'How to resolve: Use Dependency Injection (DI). High-level classes receive interfaces (`IMessageService`) via constructor injection rather than doing `new EmailService()` directly inside the class.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// Abstraction
public interface IMessageService
{
    void SendMessage(string message);
}

// Low-level implementations
public class EmailService : IMessageService
{
    public void SendMessage(string msg) => Console.WriteLine($"Email sent: {msg}");
}

public class SmsService : IMessageService
{
    public void SendMessage(string msg) => Console.WriteLine($"SMS sent: {msg}");
}

// High-level module depends strictly on abstraction!
public class NotificationService
{
    private readonly IMessageService _messageService;

    // Injected via constructor
    public NotificationService(IMessageService messageService)
    {
        _messageService = messageService;
    }

    public void Notify(string text) => _messageService.SendMessage(text);
}`,
      explanation: 'NotificationService is decoupled from EmailService; easily swapped or mocked in unit tests.'
    },
    keyTakeaways: [
      'Removes hardcoded dependencies (`new ConcreteClass()`).',
      'Enables unit testing with mock implementations.',
      'Built-in first-class support in ASP.NET Core.'
    ],
    companyTags: ['Microsoft', 'Amazon', 'Accenture'],
    difficulty: 'Hard'
  },
  {
    id: 140,
    questionNumber: 140,
    category: 'Design Patterns',
    title: 'WHAT IS SINGLETON DESIGN PATTERN? HOW TO MAKE IT THREAD-SAFE?',
    shortSummary: 'Singleton ensures a class has only one instance throughout the application lifecycle with a global access point.',
    detailedPoints: [
      'Singleton is a Creational design pattern that guarantees only a SINGLE instance of a class exists in the entire application.',
      'Common uses: Application Logging, Configuration managers, Database connection pools, Caching.',
      'Steps to create a Singleton class:',
      '1. Create a `sealed` class so no other class can inherit from it.',
      '2. Make the constructor `private` so external callers cannot instantiate it with `new`.',
      '3. Declare a `private static` instance variable.',
      '4. Expose a `public static` method or property (`Instance` / `GetInstance()`) that returns the single instance.',
      '5. Thread safety: Use `lock` or modern `Lazy<T>` for thread-safe lazy initialization.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// Modern, Thread-Safe, Lazy Singleton using Lazy<T>
public sealed class LoggerService
{
    private static readonly Lazy<LoggerService> _instance =
        new Lazy<LoggerService>(() => new LoggerService());

    // Private constructor
    private LoggerService()
    {
        Console.WriteLine("Logger initialized once!");
    }

    // Public accessor
    public static LoggerService Instance => _instance.Value;

    public void Log(string message) => Console.WriteLine($"[LOG]: {message}");
}

// Usage:
static void Main()
{
    LoggerService s1 = LoggerService.Instance;
    LoggerService s2 = LoggerService.Instance;
    Console.WriteLine(ReferenceEquals(s1, s2)); // Output: True
}`,
      explanation: 'Lazy<T> guarantees thread safety and lazy initialization out of the box in .NET.'
    },
    keyTakeaways: [
      'Private constructor prevents outside instantiation.',
      'Sealed class prevents inheritance.',
      '`Lazy<T>` is the modern idiomatic way to achieve thread safety in C#.'
    ],
    companyTags: ['Microsoft', 'Infosys', 'TCS', 'Tech Mahindra'],
    difficulty: 'Medium'
  },
  {
    id: 142,
    questionNumber: 142,
    category: 'Design Patterns',
    title: 'WHAT IS FACTORY PATTERN? WHY TO USE FACTORY PATTERN?',
    shortSummary: 'Factory pattern delegates object creation to a factory method/class, decoupling the client from specific concrete class types.',
    detailedPoints: [
      'The Factory Method pattern is a creational pattern that manages object creation via an interface or abstract method.',
      'Why use Factory Pattern?',
      '1. Decouples client code from concrete implementations (the client interacts with `IProduct`, not `ConcreteProduct`).',
      '2. Consolidates `new` instantiations in one centralized factory instead of scattering them throughout the application.',
      '3. Makes adding new product types seamless by updating only the factory, respecting Open-Closed Principle.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `public interface ICard
{
    string GetCardType();
    int GetCreditLimit();
}

public class PlatinumCard : ICard
{
    public string GetCardType() => "Platinum";
    public int GetCreditLimit() => 100000;
}

public class TitaniumCard : ICard
{
    public string GetCardType() => "Titanium";
    public int GetCreditLimit() => 50000;
}

// Factory
public static class CardFactory
{
    public static ICard CreateCard(string cardType)
    {
        return cardType switch
        {
            "Platinum" => new PlatinumCard(),
            "Titanium" => new TitaniumCard(),
            _ => throw new ArgumentException("Invalid card type")
        };
    }
}`,
      explanation: 'Client requests card by name without referencing concrete PlatinumCard or TitaniumCard classes directly.'
    },
    keyTakeaways: [
      'Encapsulates object instantiation logic.',
      'Hides concrete class names from callers.',
      'Enables polymorphic creation based on runtime parameters.'
    ],
    companyTags: ['Microsoft', 'Accenture', 'TCS'],
    difficulty: 'Medium'
  }
];
