<?php


//Пока всё сделанно. Проверь в конце ток.
//Методы тоже сделаны. пока что.



class Technic{

    // подключение к базе данных и таблице 'products' 
    private $conn;
    private $table_name = "Technic";

    // конструктор для соединения с базой данных 
    public function __construct($db){
        $this->conn = $db;
    }

// метод create - создание товаров 
function create($RegNumber, $TechnicType, $Name, $TechnicPhoto, $TechnicParam){
    
    // запрос для вставки (создания) записей 
     $query = "INSERT 
                    INTO 
                `Technic`
                (`RegNumber`, `TechnicType`, `Name`, `TechnicPhoto`, `TechParameters`) 
                VALUES 
                ('$RegNumber','$TechnicType' , '$Name', '$TechnicPhoto', '$TechnicParam')
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $RegNumber, PDO::PARAM_INT);
    $stmt->bindParam(2, $TechnicType, PDO::PARAM_INT);
    $stmt->bindParam(3, $Name, PDO::PARAM_INT);
    $stmt->bindParam(4, $TechnicPhoto, PDO::PARAM_INT);
    $stmt->bindParam(5, $TechnicParam, PDO::PARAM_INT);
    
    $stmt->execute();

}

function createNewTechnicOnObject($ObjectID, $TechnicID, $Start, $End){
    
    // запрос для вставки (создания) записей 
     $query = "INSERT INTO `TechnicOnObject`(`TechnicID`, `ObjectID`, `StartDate`, `EndDate`) VALUES ('$TechnicID','$ObjectID','$Start','$End')";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ObjectID, PDO::PARAM_INT);
    $stmt->bindParam(2, $TechnicID, PDO::PARAM_INT);
    $stmt->bindParam(3, $Start, PDO::PARAM_INT);
    $stmt->bindParam(4, $End, PDO::PARAM_INT);
    
    $stmt->execute();

}

function DeleteTechnic($TechnicID){
    
    // запрос для вставки (создания) записей 
     $query = "DELETE FROM `Technic` WHERE TechnicID = '$TechnicID'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $TechnicID, PDO::PARAM_INT);
    
    $stmt->execute();

}


function GetNewPolomka(){
    
    // запрос для вставки (создания) записей 
     $query = "
     SELECT 
     Po.PolomkaID,
     Po.PolomkaDes,
     Po.date,
     Po.TechnicID,
     Po.Status,
     Po.Seen,
     Em.Name as EmployeeName,
     Em.EmployeeID,
     Em.Email,
     Em.Phone,
     Th.Name as TechnicName
     FROM `Polomka` Po
     LEFT JOIN Employee Em on Em.EmployeeID = Po.EmployeeID
     LEFT JOIN Technic Th on Th.TechnicID = Po.TechnicID
     WHERE Po.Seen = 0
     ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ObjectID, PDO::PARAM_INT);
    $stmt->bindParam(2, $TechnicID, PDO::PARAM_INT);
    $stmt->bindParam(3, $Start, PDO::PARAM_INT);
    $stmt->bindParam(4, $End, PDO::PARAM_INT);
    
    $stmt->execute();
    
    return $stmt;

}

function SetPolomkaSeen($PolomkaID){
    
    // запрос для вставки (создания) записей 
     $query = "
     UPDATE `Polomka` SET `Seen`= 1 WHERE PolomkaID = '$PolomkaID'
     ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $PolomkaID, PDO::PARAM_INT);
    
    $stmt->execute();
    
    return $stmt;

}

function UpdateStatus($Status, $TechnicID){
        // запрос для вставки (создания) записей 
     $query = "UPDATE `Technic` SET `Status`='$Status' WHERE TechnicID = '$TechnicID' ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $TechnicID, PDO::PARAM_INT);
    $stmt->bindParam(2, $Status, PDO::PARAM_INT);
    
    $stmt->execute();
}

function createRepairInfo($RepairDes, $Date, $Price, $TechnicID, $EndDate){
    
    // запрос для вставки (создания) записей 
     $query = "INSERT INTO `Repair`(`RepairDes`, `Date`, `Price`, `TechnicID`, `EndDate`) VALUES ('$RepairDes','$Date','$Price','$TechnicID', '$EndDate')
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $RepairDes, PDO::PARAM_INT);
    $stmt->bindParam(2, $Date, PDO::PARAM_INT);
    $stmt->bindParam(3, $Price, PDO::PARAM_INT);
    $stmt->bindParam(4, $TechnicID, PDO::PARAM_INT);
     $stmt->bindParam(5, $EndDate, PDO::PARAM_INT);
    
    $stmt->execute();
}

function createTOInfo($Des, $Date, $Price, $TechnicID,$EndDate){
    
    // запрос для вставки (создания) записей 
     $query = "INSERT INTO `TechTO`(`Des`, `Date`, `Price`, `TechnicID`, `EndDate`) VALUES ('$Des','$Date','$Price','$TechnicID', '$EndDate')
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $Des, PDO::PARAM_INT);
    $stmt->bindParam(2, $Date, PDO::PARAM_INT);
    $stmt->bindParam(3, $Price, PDO::PARAM_INT);
    $stmt->bindParam(4, $TechnicID, PDO::PARAM_INT);
    $stmt->bindParam(5, $EndDate, PDO::PARAM_INT);
    
    $stmt->execute();
}

function GetTOInfo($TechnicID){
    
    // запрос для вставки (создания) записей 
     $query = "SELECT `TechTOID`, `Des`, `Date`, `Price` FROM `TechTO` WHERE TechnicID = '$TechnicID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $TechnicID, PDO::PARAM_INT);
    
     $stmt -> execute();
    return $stmt;

}

function GetOneTechnicRas($TechnicID){
    
    // запрос для вставки (создания) записей 
     $query = "SELECT `TechnicOnObjectID`, `TechnicID`, `ObjectID`, `StartDate`, `EndDate` FROM `TechnicOnObject` WHERE TechnicID = '$TechnicID' and Status=1
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $TechnicID, PDO::PARAM_INT);
    
     $stmt -> execute();
    return $stmt;

}

function GetRepairInfo($TechnicID){
    
    // запрос для вставки (создания) записей 
     $query = "SELECT `RepairID`, `RepairDes`, `Date`, `Price`, `EndDate` FROM `Repair` WHERE TechnicID = '$TechnicID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $TechnicID, PDO::PARAM_INT);
    
     $stmt -> execute();
    return $stmt;

}

function createPolomkaInfo($Des, $PolomkaDate, $TechnicID, $Status, $EmployeeID){
    
    // запрос для вставки (создания) записей 
     $query = "INSERT INTO `Polomka`(`PolomkaDes`, `date`, `TechnicID`, `Status`, `EmployeeID`) VALUES ('$Des','$PolomkaDate', '$TechnicID', '$Status', '$EmployeeID')
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $Des, PDO::PARAM_INT);
    $stmt->bindParam(2, $PolomkaDate, PDO::PARAM_INT);
    $stmt->bindParam(3, $TechnicID, PDO::PARAM_INT);
    $stmt->bindParam(4, $Status, PDO::PARAM_INT);
    $stmt->bindParam(5, $EmployeeID, PDO::PARAM_INT);
    
    $stmt->execute();

}

function GetPolomkaInfo($TechnicID){
    
    // запрос для вставки (создания) записей 
     $query = "SELECT `PolomkaID`, `PolomkaDes`, `date`, `Status` FROM `Polomka` WHERE TechnicID = '$TechnicID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $TechnicID, PDO::PARAM_INT);
    
     $stmt -> execute();
    return $stmt;

}

function UpdateNeedTech($NeedTechID, $Status, $Desc){
    
    // запрос для вставки (создания) записей 
     $query = "UPDATE `TechnicOnObject` SET `Status`='$Status',`Description`='$Desc' WHERE TechnicOnObjectID = '$NeedTechID'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $NeedTechID, PDO::PARAM_INT);
    $stmt->bindParam(1, $Status, PDO::PARAM_INT);
    $stmt->bindParam(1, $Desc, PDO::PARAM_INT);
    
     $stmt -> execute();
    return $stmt;

}

function GetAllNeedTechnic(){
    
    // запрос для вставки (создания) записей 
     $query = "SELECT 
     TOO.TechnicOnObjectID, 
     TOO.TechnicID, 
     TOO.ObjectID, 
     TOO.StartDate, 
     TOO.EndDate, 
     TOO.Status,
     Th.RegNumber,
     Th.Name as TechName,
     OB.Name as ObjectName
     FROM `TechnicOnObject` TOO
     JOIN Objects OB on OB.ObjectID = TOO.ObjectID
     LEFT JOIN Technic Th on Th.TechnicID = TOO.TechnicID
     WHERE TOO.Status = 0
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $TechnicID, PDO::PARAM_INT);
    
     $stmt -> execute();
    return $stmt;

}

function Read(){

    // запрос для вставки (создания) записей 
     $query = "SELECT `TechnicID`, `RegNumber`, `TechnicType`, `Name`, `TechnicPhoto`, `Status` FROM `Technic`
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt -> execute();
    return $stmt;
}

function ReadOne($TechnicID){

    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT `TechnicID`, `RegNumber`, `TechnicType`, `Name`, `TechnicPhoto`, `Status`, `TechParameters` FROM `Technic`where TechnicID = '$TechnicID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $TechnicID, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}


function ReadTechnicOnObject($ObjectID){

    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT 
                Th.TechnicID, 
                Th.RegNumber, 
                Th.TechnicType, 
                Th.Name, 
                Th.TechnicPhoto, 
                Th.Status as TechnicStatus, 
                TOO.EndDate, 
                TOO.StartDate,
                TOO.Description,
                TOO.Status as TOOStatus,
                TOO.TechnicOnObjectID 
                FROM `Technic` Th
                LEFT JOIN TechnicOnObject TOO on TOO.TechnicID = Th.TechnicID
                WHERE TOO.ObjectID = '$ObjectID'
     
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ObjectID, PDO::PARAM_INT);
    $stmt->bindParam(2, $CreateDate, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}


}
?>