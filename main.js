
// データ
var result = "";

var last_key_was_equal = false;


// 初期表示
window.onload = function () {
  result = document.getElementById('result');
};

// Cキー押下
function c_click(){
  result.value = "0";
  
}

// 数字キー押下
function num_click(val){
    if(last_key_was_equal)  result.value = 0;
    last_key_was_equal = false;
    //数値押下後、フラグが戻り最終押下が＝の場合、リザルトの値を０にする
    //num_click実行後の処理がわからない

  if(result.value =="0" && val == "0"){
    result.value = "0";
  }else if(result.value == "0" && val == "."){
    result.value = "0.";
  }else if(result.value == "0"){
    result.value = val;//数字の入力(＝入力後は入力した値がリザルト画面へ表示)
  }else if(is_opeandzero_last()){
    result.value = result.value.slice(0,-1) + val
  }else if(is_point_last()){
    if(val == "." ) {
      result.value = result.value.slice(0,-1) + val
    }else{
      result.value += val }
  }else if(is_pointandnum_last()){
    if(val == "."){
       result.value = result.value.slice(0)
    }else{
    result.value += val}
  }else{
    result.value += val;//数字の入力
  }
}

// 演算子キー押下
function ope_click(val){

  
  if(is_ope_last()){
    result.value = result.value.slice(0,-1) + val; 
    //最後が演算子の場合、頭から末尾２文字目を出力し（最後の入力値（演算子は捨てる））、入力値（演算子）を足す
  
  }else if(is_point_last()){
    result.value = result.value.slice(0)


  } else {
    result.value += val;　//それ以外は値を代入

  }
}







// =キークリック
function equal_click(){
    if(is_ope_last())  result.value = result.value.slice(0,-1);
    //最後が演算子の場合、最後の入力値は捨てる
  
    var temp = new Function("return " + result.value.replaceAll("×", "*").replaceAll("÷", "/"))();//*や/は文字列扱いにならないのか？
    if(temp == Infinity || Number.isNaN(temp)){
      result.value = "Error";
    }else{
      result.value = temp;
      last_key_was_equal = true;
      //=キー押下でフラグ
    
  }}


// 入力されている最後の変数が演算子かどうかを判定する関数（文字列に変換した最後の１文字が４種の記号を含んでいるという結果を返す関数）
function is_ope_last(){
  return ["+","-","×","÷"].includes(result.value.toString().slice(-1));
}

//入力されている最後が演算子＋０の場合
function is_opeandzero_last(){
  return ["+0","-0","×0","÷0"].includes(result.value.toString().slice(-2));
}
//小数点が最後の場合
function is_point_last(){
  return ["."].includes(result.value.toString().slice(-1));
}

//小数点と値が最後の場合（１．2など）
function is_pointandnum_last(){
  return [".1",".2",".3",".4",".5",".6",".7",".8",".9"].includes(result.value.toString().slice(-2));
}


