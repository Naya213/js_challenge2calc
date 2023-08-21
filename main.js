/* global $*/
$(document).ready(function(){
    
    let $num_left; //左辺表示データ取得用
    let $num_right; //右辺表示データ取得用
    
    let result = 0;  //左辺と右辺の計算結果値
    let num = "";    //入力値取得用
    let calc_symbol = ""; //演算子を代入
    
    let is_numBtn = false ; //false：演算子を入力できない(数字が入っていないから)
    
    let flg_symbolBtn = 0; //1なら入力値を左辺に入れるのをやめる。 2なら「=ボタン」が押された状態
    
    
    
    // 四則演算関数
    function doCalc(num1,num2,symbol){
        // 保持した文字列型の数値を数字型にする
        num1 = Number(num1);
        num2 = Number(num2);
        
        switch (symbol) {
         case '+':
           result = num1 + num2; 
               break;
         case '-':
           result = num1 - num2; 
               break;
         case '*':
           result = num1 * num2;
               break;
         case '/':
           result = num1 / num2;
               break;
        }
    }
    
    // 画面更新関数
    function screenChange(){

        $num_left = $(".num_left").html();
        $num_right = $(".num_right").html();
        
        doCalc($num_left,$num_right,calc_symbol);
        
        calc_symbol = $(".calc_symbol").html(); //二回目に入力された演算子を取得
        $(".sub_screen").html($num_left + calc_symbol + $num_right + "=");
        $(".num_left").html(result);
        $(".num_right").html("");
        
        num = "";
        
        is_numBtn = false; //右辺確定状態へ戻す
            
    }
    
    // ＝ボタン
    $(".btn_equal").on('click', function() {
        if(is_numBtn){
            screenChange();
        }
        
        $(".calc_symbol").html(""); //結果数値のみ表示
        
        flg_symbolBtn = 2;
    });
    
    // リセットボタン
    $(".btn_ac").on('click', function() {
    
        $num_left = ""; 
        $num_right = "";
        result = 0;  
        num = "";    
        calc_symbol = ""; 
        is_numBtn = false ;
        flg_symbolBtn = 0;
        
        $(".sub_screen").html("");
        $(".num_left").html("");
        $(".calc_symbol").html("");
        $(".num_right").html("");
        
    });
    
   
    
    // 数字ボタン
    $(".num").on('click', function(now_data) {
        
        // ＝ボタン押下後、数字入力防止
        if(flg_symbolBtn == 3){ //＝ボタン押した後なら
            return;
        }
        
         now_data = $(this).html();
        
        // 小数点の連続入力防止if文 
        if(is_numBtn == false && now_data == "."){ //数字が入っていない、入力データが小数点なら
            return;
        }else if(/\./.test(num) && now_data == "."){//入力値にすでに小数点が入ってる、追加データは小数点か
            now_data = "";
        }
        
        num += now_data;
        
        // 格納する変数分岐
        if(flg_symbolBtn == 0){
            $(".num_left").html(num);
        }else if(flg_symbolBtn == 1){
            $(".num_right").html(num);
        }
        
        is_numBtn = true;
        
   });
   
   
    $(".symbol").on('click', function() {
        
                                                                   
        if(is_numBtn && flg_symbolBtn == 0 || flg_symbolBtn == 2){　//左辺に数字が入っていて
                                                                    //演算子は一度も押されていない(行頭に演算子が入るのを防止する)
                                                                    //または、=ボタンが押されている(=ボタン後も計算を続けるため)
            flg_symbolBtn = 1;
            is_numBtn = false;
            
            num = "";　// numに左辺の値が入ってるため初期化
            
            calc_symbol = $(this).html();
            $(".calc_symbol").html(calc_symbol);

        }else if(is_numBtn == false && flg_symbolBtn == 1){ //連続で演算子が押されたら
            
            calc_symbol = $(this).html();
            $(".calc_symbol").html(calc_symbol);

        }else if(is_numBtn && flg_symbolBtn == 1){ //右辺に数字が入ってたら
            
            screenChange();
            
            calc_symbol = $(this).html();
            $(".calc_symbol").html(calc_symbol);
        }
        
   }); 
    
    
    
    
    
});