# Mini_Project
Library project. Includes a server side WEB API in C# with data stored in a SQL database. The client side is managed by Angular.
# README

## 1. נושא הפרויקט

מערכת לניהול ספריה.
המערכת מאפשרת ניהול ספרים, חברי ספריה והשאלת ספרים לחברים.

## 2. תיאור הטבלאות והקשרים

**Books** – טבלת הספרים במערכת (שם ספר, מחבר, תיאור, סטטוס).

**Members** – טבלת חברי הספריה (שם, אימייל וכו').

**Loans** – טבלת השאלות ספרים.

**קשרים בין הטבלאות:**

* ספר (`Books`) יכול להופיע במספר השאלות בטבלת `Loans`.
* חבר (`Members`) יכול להשאיל מספר ספרים.
* בטבלת `Loans` יש מפתחות זרים:

  * `BookId` מקושר ל־`Books`
  * `MemberId` מקושר ל־`Members`

## 3. Stored Procedures

* `sp_Books_Create` – הוספת ספר חדש.
* `sp_Books_Update` – עדכון פרטי ספר.
* `sp_Books_GetById` – שליפת ספר לפי מזהה.
* `sp_Books_GetAll` – שליפת כל הספרים / חיפוש ספרים.
* `sp_Books_LoanBook` – השאלת ספר לחבר.

## 4. איך מריצים את צד השרת וצד הלקוח

1. מריצים את קובץ ה-SQL ב-SQL Server כדי ליצור את הטבלאות וה-Stored Procedures.
2. פותחים את פרויקט השרת ומריצים אותו (API).
3. פותחים את פרויקט הלקוח ומריצים את האפליקציה (Angular).
4. לאחר הרצת שני הצדדים ניתן להיכנס לאפליקציה דרך הדפדפן.

