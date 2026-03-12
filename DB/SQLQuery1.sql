CREATE TABLE Members (
    MemberId INT PRIMARY KEY IDENTITY(1,1), 
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100),
);

CREATE TABLE Books (
    BookId INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,        
    Author NVARCHAR(100),                
    Description NVARCHAR(MAX),           
    StatusId INT NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()  
);


CREATE TABLE Loans (
    LoanId INT PRIMARY KEY IDENTITY(1,1),
    BookId INT NOT NULL,                   
    MemberId INT NOT NULL,                 
    LoanDate DATETIME DEFAULT GETDATE(),   
    ReturnDate DATETIME NULL,              

    CONSTRAINT FK_Loans_Books FOREIGN KEY (BookId) REFERENCES Books(BookId),
    CONSTRAINT FK_Loans_Members FOREIGN KEY (MemberId) REFERENCES Members(MemberId)
);



INSERT INTO Members (FullName, Email) VALUES (N'ישראל ישראלי', 'israel@test.com');
INSERT INTO Members (FullName, Email) VALUES (N'שרה לוי', 'sara@test.com');

INSERT INTO Books (Title, Author, Description, StatusId) 
VALUES (N'המסע אל העתיד', N'אברהם כהן', N'ספר מדע בדיוני מרתק', 1);

INSERT INTO Books (Title, Author, Description, StatusId) 
VALUES (N'יסודות התכנות', N'משה לוי', N'מדריך מקיף לשפות קוד', 1);

GO
CREATE OR ALTER PROCEDURE sp_Books_Create
    @Title NVARCHAR(200),
    @Author NVARCHAR(100),
    @Description NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO Books (Title, Author, Description, StatusId,CreatedAt)
    VALUES (@Title, @Author, @Description, 1,GETDATE());
    
    SELECT SCOPE_IDENTITY() AS NewBookId; 
END;
GO

CREATE OR ALTER PROCEDURE sp_Books_Update
    @BookId INT,
    @Title NVARCHAR(200),
    @Author NVARCHAR(100),
    @Description NVARCHAR(MAX),
    @StatusId INT
AS
BEGIN
    UPDATE Books
    SET Title = @Title,
        Author = @Author,
        Description = @Description,
        StatusId = @StatusId
    WHERE BookId = @BookId;
END;
GO

CREATE OR ALTER PROCEDURE sp_Books_GetById
    @Id INT
AS
BEGIN
    SELECT B.BookId, B.Title, B.Author, B.Description, B.StatusId,B.CreatedAt,
           CASE 
                WHEN B.StatusId = 1 THEN N'זמין'
                WHEN B.StatusId = 2 THEN N'מושאל'
                ELSE N'לא ידוע'
           END AS StatusName
    FROM Books B
    WHERE B.BookId = @Id;
END;
GO

CREATE OR ALTER PROCEDURE sp_Books_GetAll
    @SearchTerm NVARCHAR(100) = NULL
AS
BEGIN
    SELECT BookId, Title, Author, StatusId, CreatedAt
    FROM Books
    WHERE (@SearchTerm IS NULL OR Title LIKE '%' + @SearchTerm + '%' OR Author LIKE '%' + @SearchTerm + '%')
    ORDER BY CreatedAt DESC;
END;
GO

CREATE OR ALTER PROCEDURE sp_Books_LoanBook
    @BookId INT,     
    @MemberId INT    
AS
BEGIN
    UPDATE Books 
    SET StatusId = 2 
    WHERE BookId = @BookId;

    INSERT INTO Loans (BookId, MemberId, LoanDate, ReturnDate)
    VALUES (
        @BookId, 
        @MemberId, 
        GETDATE(),                   
        DATEADD(day, 14, GETDATE())  
    );

    SELECT N'ההשאלה בוצעה בהצלחה. תאריך החזרה צפוי: ' + CAST(DATEADD(day, 14, GETDATE()) AS NVARCHAR(30)) AS Message;
END;
GO
