<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// подключение файла для соединения с базой и файл с объектом 
include_once '../config/database.php';
include_once '../objects/Technic.php';

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
$Technic = new Technic($db);

$NeedTechID = $_POST['NeedTechID'];
$Status = $_POST['Status'];
$Desc = $_POST['Desc'];

// прочитаем детали товара для редактирования
$stmt = $Technic->UpdateNeedTech($NeedTechID, $Status, $Desc);
$stmt = $Technic->GetAllNeedTechnic();

$num = $stmt->rowCount();

if ($num>0) {

    // массив товаров 
    $products_arr=array();
    $products_arr["NeedTechnic"]=array();

    // получаем содержимое нашей таблицы 
    // fetch() быстрее, чем fetchAll() 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // извлекаем строку 
        extract($row);
        
        $product_item=array(
            "TechnicOnObjectID" => $TechnicOnObjectID,
            "TechnicID" => $TechnicID,
            "ObjectID" => $ObjectID,
            "StartDate" => $StartDate,
            "EndDate" => $EndDate,
            "Status" => $Status,
            "RegNumber" => $RegNumber,
            "TechName" => $TechName,
            "ObjectName" => $ObjectName
        );

        array_push($products_arr["NeedTechnic"], $product_item);
    }
        // устанавливаем код ответа - 200 OK 
   http_response_code(200);
    // выводим данные о товаре в формате JSON 
    echo json_encode($products_arr);
}

else {
    // код ответа - 404 Не найдено 
    http_response_code(200);
     echo json_encode(0);
}
?>