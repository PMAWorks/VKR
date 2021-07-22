<?php


//Пока всё сделанно. Проверь в конце ток.
//Методы тоже сделаны. пока что.



class Workers{

    // подключение к базе данных и таблице 'products' 
    private $conn;
    private $table_name = "Worker";

    // конструктор для соединения с базой данных 
    public function __construct($db){
        $this->conn = $db;
    }

// метод create - создание товаров 
function create($Name, $PassportSer, $PassportNumber, $Adress, $WorkDay, $WorkEndDate, $Birthday, $Salary, $Avans, $WorkerChief, $CompanyName, $photo, $Phone, $Email){
    
    // запрос для вставки (создания) записей 
     $query = "INSERT INTO `Worker`(`Name`, `PassportSer`, `PassportNumber`, `Adress`, `WorkDay`, `WorkEndDate`, `Birthday`, `Salary`, `Avans`, `WorkerChief`, `WorkerPhoto`, `Phone`, `Email`) 
     VALUES ('$Name','$PassportSer','$PassportNumber','$Adress','$WorkDay','$WorkEndDate','$Birthday','$Salary','$Avans','$WorkerChief','$photo', '$Phone', '$Email')
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $Name, PDO::PARAM_INT);
    $stmt->bindParam(2, $PassportSer, PDO::PARAM_INT);
    $stmt->bindParam(3, $PassportNumber, PDO::PARAM_INT);
    $stmt->bindParam(4, $Adress, PDO::PARAM_INT);
    $stmt->bindParam(5, $WorkDay, PDO::PARAM_INT);
    $stmt->bindParam(6, $WorkEndDate, PDO::PARAM_INT);
    $stmt->bindParam(7, $Birthday, PDO::PARAM_INT);
    $stmt->bindParam(8, $Salary, PDO::PARAM_INT);
    $stmt->bindParam(9, $Avans, PDO::PARAM_INT);
    $stmt->bindParam(10, $WorkerChief, PDO::PARAM_INT);
    $stmt->bindParam(11, $photo, PDO::PARAM_INT);
    $stmt->bindParam(12, $Phone, PDO::PARAM_INT);
    $stmt->bindParam(13, $Email, PDO::PARAM_INT);
    
    $stmt->execute();

}

function ReadAll(){
    
    // запрос для вставки (создания) записей 
     $query = "SELECT `WorkerID`, `Name`, `PassportSer`, `PassportNumber`, `Adress`, `WorkDay`, `WorkEndDate`, `Birthday`, `Salary`, `Avans`, `WorkerChief`, `WorkerPhoto`, `Phone`, `Email` FROM `Worker`
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->execute();

    return $stmt;
}

function ReadForEmployee($EmployeeID){
    // запрос для вставки (создания) записей  
     $query = "SELECT `WorkerID`, `Name`, `PassportSer`, `PassportNumber`, `Adress`, `WorkDay`, `WorkEndDate`, `Birthday`, `Salary`, `Avans`, `WorkerChief`, `WorkerPhoto`, `Phone`, `Email` FROM `Worker` where WorkerChief = '$EmployeeID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $EmployeeID, PDO::PARAM_INT);
    
    $stmt->execute();

    return $stmt;
}


function ReadOne($WorkerID){
    
    // запрос для вставки (создания) записей 
     $query = "SELECT `WorkerID`, `Name`, `PassportSer`, `PassportNumber`, `Adress`, `WorkDay`, `WorkEndDate`, `Birthday`, `Salary`, `Avans`, `WorkerChief`, `WorkerPhoto`, `Phone`, `Email` FROM `Worker`WHERE WorkerID = '$WorkerID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $WorkerID, PDO::PARAM_INT);
    
    $stmt->execute();

    return $stmt;
}

function UpdateWorker($Name, $PassportSer, $PassportNumber, $Adress, $StartDate, $EndDate, $BirthDay, $Salary, $Avans, $TechnicPreviewPhoto, $ObjectID, $Phone, $Email, $WorkerID){
    
    // запрос для вставки (создания) записей 
     $query = "UPDATE `Worker` 
     SET 
     `Name`= '$Name',
     `PassportSer`= '$PassportSer',
     `PassportNumber`= '$PassportNumber',
     `Adress`= '$Adress',
     `WorkDay`= '$StartDate',
     `WorkEndDate`= '$EndDate',
     `Birthday`= '$BirthDay',
     `Salary`= '$Salary',
     `Avans`= '$Avans',
     `WorkerPhoto`= '$TechnicPreviewPhoto',
     `Phone`= '$Phone',
     `Email`= '$Email'
     WHERE WorkerID = '$WorkerID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $Name, PDO::PARAM_INT);
    $stmt->bindParam(2, $PassportSer, PDO::PARAM_INT);
    $stmt->bindParam(3, $PassportNumber, PDO::PARAM_INT);
    $stmt->bindParam(4, $Adress, PDO::PARAM_INT);
    $stmt->bindParam(5, $StartDate, PDO::PARAM_INT);
    $stmt->bindParam(6, $EndDate, PDO::PARAM_INT);
    $stmt->bindParam(7, $BirthDay, PDO::PARAM_INT);
    $stmt->bindParam(8, $Avans, PDO::PARAM_INT);
    $stmt->bindParam(9, $TechnicPreviewPhoto, PDO::PARAM_INT);
    $stmt->bindParam(10, $ObjectID, PDO::PARAM_INT);
    $stmt->bindParam(11, $Phone, PDO::PARAM_INT);
    $stmt->bindParam(12, $Email, PDO::PARAM_INT);
    $stmt->bindParam(13, $WorkerID, PDO::PARAM_INT);
    
    $stmt->execute();
    
    $query = "UPDATE `WorkerOnObject` SET `ObjectID`= '$ObjectID',`StartDate`='$StartDate',`EndDate`= '$EndDate' WHERE WorkerID = '$WorkerID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
     $stmt->bindParam(1, $Name, PDO::PARAM_INT);
    $stmt->bindParam(2, $PassportSer, PDO::PARAM_INT);
    $stmt->bindParam(3, $PassportNumber, PDO::PARAM_INT);
    $stmt->bindParam(4, $Adress, PDO::PARAM_INT);
    $stmt->bindParam(5, $StartDate, PDO::PARAM_INT);
    $stmt->bindParam(6, $EndDate, PDO::PARAM_INT);
    $stmt->bindParam(7, $BirthDay, PDO::PARAM_INT);
    $stmt->bindParam(8, $Avans, PDO::PARAM_INT);
    $stmt->bindParam(9, $TechnicPreviewPhoto, PDO::PARAM_INT);
    $stmt->bindParam(10, $ObjectID, PDO::PARAM_INT);
    $stmt->bindParam(11, $Phone, PDO::PARAM_INT);
    $stmt->bindParam(12, $Email, PDO::PARAM_INT);
    $stmt->bindParam(13, $WorkerID, PDO::PARAM_INT);
    
    $stmt->execute();

    return $stmt;
}


function DeleteWorker($WorkerID){
    
    // запрос для вставки (создания) записей 
     $query = "DELETE FROM `Worker` WHERE WorkerID = '$WorkerID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $WorkerID, PDO::PARAM_INT);
    
    $stmt->execute();

    return $stmt;
}

function CreateWorkerOnObject($WorkerID, $ObjectID, $WorkDay, $WorkEndDate){
    
    // запрос для вставки (создания) записей 
     $query = "INSERT INTO `WorkerOnObject`(`ObjectID`, `WorkerID`, `StartDate`, `EndDate`) VALUES ('$ObjectID','$WorkerID','$WorkDay','$WorkEndDate')
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $WorkerID, PDO::PARAM_INT);
    $stmt->bindParam(2, $ObjectID, PDO::PARAM_INT);
    $stmt->bindParam(3, $WorkDay, PDO::PARAM_INT);
    $stmt->bindParam(4, $WorkEndDate, PDO::PARAM_INT);
    
    $stmt->execute();

    return $stmt;
}

function ReadWorkerOnObject($WorkerID){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT WOO.WorkerOnObjectID, WOO.ObjectID, WOO.WorkerID, WOO.StartDate, WOO.EndDate, Ob.Name 
     FROM `WorkerOnObject` WOO 
     LEFT JOIN Objects Ob on Ob.ObjectID = WOO.ObjectID
     WHERE WOO.WorkerID = '$WorkerID' and ('$CreateDate'<WOO.EndDate) and ('$CreateDate'>WOO.StartDate)
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $WorkerID, PDO::PARAM_INT);
    $stmt->bindParam(2, $CreateDate, PDO::PARAM_INT);
    
    $stmt->execute();

    return $stmt;
}


}
?>