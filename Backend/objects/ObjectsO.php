<?php


//Пока всё сделанно. Проверь в конце ток.
//Методы тоже сделаны. пока что.



class ObjectsO {

    // подключение к базе данных и таблице 'products' 
    private $conn;
    private $table_name = "Objects";

    // конструктор для соединения с базой данных 
    public function __construct($db){
        $this->conn = $db;
    }

// метод create - создание товаров 
function create($Adress, $Name, $ObjectType, $StartDate, $EndDate, $Materials, $Price, $Avans, $MainPhoto, $ClientID, $EmployeeID){
    

    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "INSERT 
                INTO 
                `Objects`
                (`Adress`, `Name`, `ObjectType`, `StartDate`, `EndDate`, `Materials`, `Price`, `Avans`, `MainPhoto`, `ClientID`, `EmployeeID`) 
                VALUES 
                ('$Adress', '$Name', '$ObjectType', '$StartDate', '$EndDate', '$Materials', '$Price', '$Avans', '$MainPhoto', '$ClientID', '$EmployeeID')
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $Adress, PDO::PARAM_INT);
    $stmt->bindParam(2, $Name, PDO::PARAM_INT);
    $stmt->bindParam(3, $ObjectType, PDO::PARAM_INT);
    $stmt->bindParam(4, $StartDate, PDO::PARAM_INT);
    $stmt->bindParam(5, $EndDate, PDO::PARAM_INT);
    $stmt->bindParam(6, $Materials, PDO::PARAM_INT);
    $stmt->bindParam(7, $Price, PDO::PARAM_INT);
    $stmt->bindParam(8, $Avans, PDO::PARAM_INT);
    $stmt->bindParam(9, $MainPhoto, PDO::PARAM_INT);
    $stmt->bindParam(10, $ClientID, PDO::PARAM_INT);
    $stmt->bindParam(11, $EmployeeID, PDO::PARAM_INT);
    
    $stmt->execute();
}

function createNeedMaterials($Name, $Col, $ObjectID){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "INSERT INTO `NeedMaterials`(`Name`, `Col`, `ObjectID`) VALUES ('$Name','$Col','$ObjectID')
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $Name, PDO::PARAM_INT);
    $stmt->bindParam(2, $Col, PDO::PARAM_INT);
    $stmt->bindParam(3, $ObjectID, PDO::PARAM_INT);
    
    $stmt->execute();
}

function DeleteObject($ObjectID){
    // запрос для вставки (создания) записей 
     $query = "DELETE FROM `Objects` WHERE ObjectID = '$ObjectID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ObjectID, PDO::PARAM_INT);
    
    $stmt->execute();
    
     $query = "DELETE FROM `WorkerOnObject` WHERE ObjectID = '$ObjectID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ObjectID, PDO::PARAM_INT);
    
    $stmt->execute();
    
     $query = "DELETE FROM `TechnicOnObject` WHERE ObjectID = '$ObjectID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ObjectID, PDO::PARAM_INT);
    
    $stmt->execute();
}


function UpdateObject($ObjectID, $Adres, $ObjectName, $ObjectType, $StartDate, $EndDate, $Price, $Avans, $CreateObjectPhotoPreview){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "UPDATE `Objects` SET 
     `Adress`= '$Adres',
     `Name`= '$ObjectName',
     `ObjectType`= '$ObjectType',
     `StartDate`= '$StartDate',
     `EndDate`= '$EndDate',
     `Price`= '$Price',
     `Avans`= '$Avans',
     `MainPhoto`= '$CreateObjectPhotoPreview'
     WHERE ObjectID = '$ObjectID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ObjectID, PDO::PARAM_INT);
    $stmt->bindParam(2, $Adres, PDO::PARAM_INT);
    $stmt->bindParam(3, $ObjectName, PDO::PARAM_INT);
    $stmt->bindParam(4, $ObjectType, PDO::PARAM_INT);
    $stmt->bindParam(5, $StartDate, PDO::PARAM_INT);
    $stmt->bindParam(6, $EndDate, PDO::PARAM_INT);
    $stmt->bindParam(7, $Price, PDO::PARAM_INT);
    $stmt->bindParam(8, $Avans, PDO::PARAM_INT);
    $stmt->bindParam(9, $CreateObjectPhotoPreview, PDO::PARAM_INT);
    
    $stmt->execute();
}

function ReadNeedMaterialsForObject($ObjectID){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT `NeedMaterialsID`, `Name`, `Col`, `ObjectID`, `Date`, `Status`, `Price` FROM `NeedMaterials` WHERE ObjectID = '$ObjectID' and Status <> 2";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ObjectID, PDO::PARAM_INT);
    
    $stmt->execute();
    
    return $stmt;
}

function ReadAllNeedMaterialsForObject(){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT 
     NM.NeedMaterialsID,
     NM.Name,
     NM.Col,
     NM.ObjectID,
     NM.Date,
     NM.Status,
     NM.Price,
     Ob.Name as ObjectName,
     Ob.Adress,
     Em.Name as EmployeeName,
     Em.Phone,
     Em.Email
     FROM `NeedMaterials` NM
     JOIN Objects Ob on Ob.ObjectID = NM.ObjectID
     LEFT JOIN Employee Em on Em.EmployeeID = Ob.EmployeeID
     WHERE NM.Status <> 2";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ObjectID, PDO::PARAM_INT);
    
    $stmt->execute();
    
    return $stmt;
}

function ReadSuppliersForNeedMat($MaterialName){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT 
     SM.SuppliersMaterialsID,
     SM.MaterialName,
     SM.MaterialPrice,
     SM.MaterialColName,
     SM.SuppliersID,
     Su.suppliersName,
     Su.suppliersPhone,
     Su.suppliersEmail
     FROM `SuppliersMaterials` SM
     LEFT JOIN suppliers Su on Su.suppliersID = SM.SuppliersID 
     WHERE SM.MaterialName = '$MaterialName'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $MaterialName, PDO::PARAM_INT);
    
    $stmt->execute();
    
    return $stmt;
}

function ReadSuppliers(){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT `suppliersID`, `suppliersName`, `suppliersPhone`, `suppliersEmail`, `suppliersINN`, `suppliersAdres`, `suppliersRasSchet` FROM `suppliers`";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $MaterialName, PDO::PARAM_INT);
    
    $stmt->execute();
    
    return $stmt;
}

function ReadSuppliersMaterials($SupplierID){
    // запрос для вставки (создания) записей 
     $query = "SELECT `SuppliersMaterialsID`, `MaterialName`, `MaterialPrice`, `MaterialColName`, `SuppliersID` FROM `SuppliersMaterials` WHERE SuppliersID = '$SupplierID'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $SupplierID, PDO::PARAM_INT);
    
    $stmt->execute();
    
    return $stmt;
}

function DeleteSuppliersMaterials($SupplierMatID){
    // запрос для вставки (создания) записей 
     $query = "DELETE FROM `SuppliersMaterials` WHERE SuppliersMaterialsID  = '$SupplierMatID'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $SupplierMatID, PDO::PARAM_INT);
    
    $stmt->execute();
    
    
    
    return $stmt;
}

function CreateSuppliersMaterials($SupplierID, $MaterialName, $MaterialPrice, $MaterialColName){
    // запрос для вставки (создания) записей 
     $query = "INSERT INTO `SuppliersMaterials`(`MaterialName`, `MaterialPrice`, `MaterialColName`, `SuppliersID`) VALUES ('$MaterialName','$MaterialPrice','$MaterialColName','$SupplierID')";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $SupplierID, PDO::PARAM_INT);
    $stmt->bindParam(2, $MaterialName, PDO::PARAM_INT);
    $stmt->bindParam(3, $MaterialPrice, PDO::PARAM_INT);
    $stmt->bindParam(4, $MaterialColName, PDO::PARAM_INT);
    
    $stmt->execute();
    
    return $stmt;
}

function DeleteSupplier($SupplierID){
    // запрос для вставки (создания) записей 
     $query = "DELETE FROM `suppliers` WHERE suppliersID = '$SupplierID'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $SupplierID, PDO::PARAM_INT);
    
    $stmt->execute();
    
    $query = "DELETE FROM `SuppliersMaterials` WHERE suppliersID = '$SupplierID'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $SupplierID, PDO::PARAM_INT);
    
    $stmt->execute();
    
    return $stmt;
}

function CreateSupplier($SuppliersName, $SuppliersPhone, $SuppliersEmail, $SuppliersINN, $SuppliersRasSchet, $SuppliersAdres){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "INSERT INTO `suppliers`(`suppliersName`, `suppliersPhone`, `suppliersEmail`, `suppliersINN`, `suppliersAdres`, `suppliersRasSchet`) VALUES ('$SuppliersName', '$SuppliersPhone', '$SuppliersEmail', '$SuppliersINN', '$SuppliersRasSchet', '$SuppliersAdres')";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $SuppliersName, PDO::PARAM_INT);
    $stmt->bindParam(2, $SuppliersPhone, PDO::PARAM_INT);
    $stmt->bindParam(3, $SuppliersEmail, PDO::PARAM_INT);
    $stmt->bindParam(4, $SuppliersINN, PDO::PARAM_INT);
    $stmt->bindParam(5, $SuppliersRasSchet, PDO::PARAM_INT);
    $stmt->bindParam(6, $SuppliersAdres, PDO::PARAM_INT);
    
    $stmt->execute();
    
    return $stmt;
}

function UpdateNeedMaterials($ID, $Status, $Date, $Price){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "UPDATE `NeedMaterials` SET `Date`='$Date',`Status`='$Status',`Price`='$Price' WHERE NeedMaterialsID = '$ID'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ID, PDO::PARAM_INT);
    $stmt->bindParam(2, $Status, PDO::PARAM_INT);
    $stmt->bindParam(3, $Date, PDO::PARAM_INT);
    $stmt->bindParam(4, $Price, PDO::PARAM_INT);
    
    $stmt->execute();
}

function Read(){

    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT `ObjectID`, `Adress`, `Name`, `ObjectType`, `StartDate`, `EndDate`, `Materials`, `Price`, `Avans`, `MainPhoto`, `Status` FROM `Objects` ORDER BY Status
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt -> execute();
    return $stmt;
}


function UpdateObjectStatus($ObjectID, $Status){

    // запрос для вставки (создания) записей 
     $query = "UPDATE `Objects` SET `Status`='$Status' WHERE ObjectID  = '$ObjectID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ObjectID, PDO::PARAM_INT);
    $stmt->bindParam(2, $Status, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}

function ReadForEmployee($EmployeeID){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT `ObjectID`, `Adress`, `Name`, `ObjectType`, `StartDate`, `EndDate`, `Materials`, `Price`, `Avans`, `MainPhoto` FROM `Objects` where EmployeeID = '$EmployeeID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt -> execute();
    return $stmt;
}

function UpdateMaterialsOnObject($NewMat, $ObjectID){

    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "UPDATE `Objects` SET `Materials`='$NewMat' WHERE ObjectID = '$ObjectID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $NewMat, PDO::PARAM_INT);
    $stmt->bindParam(2, $ObjectID, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}

function ReadOne($ObjectID){

    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT `ObjectID`, `Adress`, `Name`, `ObjectType`, `StartDate`, `EndDate`, `Materials`, `Price`, `Avans`, `MainPhoto`, `ClientID`, `EmployeeID`, `Status` FROM `Objects` Where ObjectID = '$ObjectID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ObjectID, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}



}
?>