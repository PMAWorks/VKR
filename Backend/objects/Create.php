<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// подключение файла для соединения с базой и файл с объектом 
include_once '../config/database.php';
include_once '../objects/ObjectsO.php';

if($_SERVER['HTTP_REFERER']){
        $pieces = explode("/", $_SERVER['HTTP_REFERER']);
        if($pieces[2] != 'pamian.site'){
            http_response_code(200);
            echo json_encode('Неавторизированное обращение. В доступе отказано.');
            return;
        }
}
else{
        echo('Неавторизированное обращение. В доступе отказано.');
        return;
}

// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();

// подготовка объекта 
$Objects = new ObjectsO($db);

$Adress = $_POST["Adress"];
$Name = $_POST["Name"];
$ObjectType = $_POST["ObjectType"];
$StartDate = $_POST["StartDate"];
$EndDate = $_POST["EndDate"];
$Materials = $_POST["Materials"];
$Price = $_POST["Price"];
$Avans = $_POST["Avans"];
$MainPhoto = $_POST["MainPhoto"];
$ClientID = $_POST["ClientID"];
$EmployeeID = $_POST['EmployeeID'];
// прочитаем детали товара для редактирования

$stmt = $Objects->create($Adress, $Name, $ObjectType, $StartDate, $EndDate, $Materials, $Price, $Avans, $MainPhoto, $ClientID, $EmployeeID);

$stmt = $Objects->ReadForEmployee($EmployeeID);
$num = $stmt->rowCount();

if ($num>0) {

    // массив товаров 
    $products_arr=array();
    $products_arr["Objects"]=array();

    // получаем содержимое нашей таблицы 
    // fetch() быстрее, чем fetchAll() 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // извлекаем строку 
        extract($row);
        
        $product_item=array(
            "ObjectID" => $ObjectID,
            "Adress" => $Adress,
            "Name" => $Name,
            "ObjectType" => $ObjectType,
            "StartDate" => $StartDate,
            "EndDate" => $EndDate,
            "Materials" => $Materials,
            "Price" => $Price,
            "Avans" => $Avans,
            "MainPhoto" => $MainPhoto
        );

        array_push($products_arr["Objects"], $product_item);
    }
        // устанавливаем код ответа - 200 OK 
    http_response_code(200);

    // выводим данные о товаре в формате JSON 
    echo json_encode($products_arr);
}

else {
    // код ответа - 404 Не найдено 
   // код ответа - 404 Не найдено 
    http_response_code(200);
    // сообщим пользователю, что товар не существует 
     echo json_encode(0);
}
?>