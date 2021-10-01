### 策略模式

> 按我个人的理解的话，策略模式相当于代码中的对象映射，通过不同的属性(策略方案名)是执行对应的方法。可以使得代码更加优雅，减少`if-else，switch case`等的使用、

eg: 询价业务中，需要根据不同的方式来给出相应的折扣力度。比如预热、大促、返场等等。
``` js
// 定义一个询价处理器对象
const priceProcessor = {
  //预售
  pre(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 20;
    }
    return originPrice * 0.9;
  },
  //大促
  onSale(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 30;
    }
    return originPrice * 0.8;
  },
  //返场
  back(originPrice) {
    if (originPrice >= 200) {
      return originPrice - 50;
    }
    return originPrice;
  },
  //尝鲜
  fresh(originPrice) {
    return originPrice * 0.5;
  },
};
```
当我们需要使用其中一调规则时，则
```js
// 询价函数
function askPrice(tag, originPrice) {
  return priceProcessor[tag](originPrice)
}
```
通过`askPrice`传对应的方式以及询问的价钱，就会有对应询价方案了。

### 再po一个实际业务场景用的
```js
 /**
   * @author: 李泽斌
   * @description: 操作题判断试图
   * @param {QuestionType} questionType
   */
  const opreateQuestionView = (questionType: QuestionType, form: any) => {
    const opreateObject: {
      [index: number]: JSX.Element;
    } = {
      [QuestionType.kitten]: <KittenQuestion form={form} />,
      [QuestionType.python]: <PythonQuestion form={form} />,
      [QuestionType.scratch]: <ScratchQuestion form={form} />,
      [QuestionType.cplus]: <CplusQuestion form={form} />,
      [QuestionType.blockly]: <BlocklyQuestion form={form} />,
    };
    return opreateObject[questionType];
  };
```


``` js
//根据对应的题型显示对应视图。ps-QuestionType是枚举
(
  [QuestionType.python, QuestionType.scratch, QuestionType.kitten, QuestionType.blockly, QuestionType.cplus].includes(questionType)
)
              ? opreateQuestionView(questionType, form)
              : ...
          
```
