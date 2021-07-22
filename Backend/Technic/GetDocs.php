<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// получаем соединение с базой данных 
include_once '../config/database.php';
// создание объекта товара 
include_once '../objects/Docs.php';

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

$database = new Database();
$db = $database->getConnection();

$Docs = new Docs($db);

$TechnicID = $_POST['TechnicID'];
$ObjectID = $_POST['ObjectID'];
$ClientID = $_POST['ClientID'];
$EmployeeID = $_POST['EmployeeID'];
$DocType = $_POST['DocType'];
$Desc = $_POST['Desc'];

$uploaddir = '../Docs/';
$uploadfile = $uploaddir . date('Y-m-d H:i:s') . $_FILES['Doc']['name'] ;

if (move_uploaded_file($_FILES['Doc']['tmp_name'], $uploadfile)) {
} else {
    echo "Возможная атака с помощью файловой загрузки!\n";
}

$DocHREF = 'https://pamian.site/KursovayaAPI/Docs/'.$uploadfile;

$Docs -> create($TechnicID, $ObjectID, $ClientID, $EmployeeID, $DocType, $DocHREF, $Desc);

$stmt = $Docs -> Read($TechnicID, $ObjectID, $ClientID, $EmployeeID, $DocType, $DocHREF);

$num = $stmt->rowCount();

if ($num>0) {

    // массив товаров 
    $products_arr=array();
    $products_arr["Docs"]=array();

    // получаем содержимое нашей таблицы 
    // fetch() быстрее, чем fetchAll() 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // извлекаем строку 
        extract($row);
        
        $product_item=array(
            "DocumentID" => $DocumentID,
            "DocHREF" => $DocHREF,
            "Description" => $Description
        );

        array_push($products_arr["Docs"], $product_item);
    }
        // устанавливаем код ответа - 200 OK 
    http_response_code(200);

    // выводим данные о товаре в формате JSON 
    echo json_encode($products_arr);
}

else {
    // код ответа - 404 Не найдено 
    http_response_code(200);
    // сообщим пользователю, что товар не существует 
     echo json_encode(0);
}

?>