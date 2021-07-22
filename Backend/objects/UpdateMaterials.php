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
include_once '../objects/Clients.php';


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
$Clients = new Clients($db);

$ObjectID = $_POST['ObjectID'];
$NewMaterials = $_POST['NewMaterials'];

// прочитаем детали товара для редактирования
$stmt = $Objects->UpdateMaterialsOnObject($NewMaterials, $ObjectID);

$stmt = $Objects->ReadOne($ObjectID);
$num = $stmt->rowCount();

if ($num>0) {

    // массив товаров 
    $products_arr=array();
    $products_arr["Object"]=array();

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
        
        $stmt = $Clients -> ReadOne($ClientID);
        $num = $stmt->rowCount();

if ($num>0) {

    // получаем содержимое нашей таблицы 
    // fetch() быстрее, чем fetchAll() 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // извлекаем строку 
        extract($row);

        
        $ClientInfo=array(
            "ClientID" => $ClientID,
            "Phone" => $Phone,
            "Email" => $Email,
            "Adress" => $Adress,
            "ClientName" => $ClientName,
            "INN" => $INN,
            "OGRN" => $OGRN,
            "Bank" => $Bank,
            "RasSchet" => $RasSchet,
            "KorrSchet" => $KorrSchet,
            "BIK" => $BIK,
            "CompanyName" => $CompanyName,
        );
    }

    }
    array_push($products_arr["Object"], $product_item);
     array_push($products_arr["Object"], $ClientInfo);
        // устанавливаем код ответа - 200 OK 
    http_response_code(200);

    // выводим данные о товаре в формате JSON 
    echo json_encode($products_arr);
}
}

else {
   // код ответа - 404 Не найдено 
    http_response_code(200);
    // сообщим пользователю, что товар не существует 
     echo json_encode(0);
}
?>