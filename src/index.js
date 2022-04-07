class Site {
    constructor(){
        this.boards =[];//Site는 n개 이상 생성 할 수 있다.
    }
    addBoard(noticeBoard) {
        if(this.boards.find((t) => t.name === noticeBoard.name)) {  //하나의 Site에 동일한 이름의 Board를 추가할 수 없다.
            throw new Error();
        };
        this.boards.push(noticeBoard);  //Board는 n개 이상 추가 할 수 있다.
    }
    findBoardByName(){
        return Object(this.boards)[0]    //Site에는 Board를 추가하고 추가된 Board를 조회할 수 있다.
    }
}

class Board extends Site{
    constructor(name) {
        super()
        this.name = name //Board { name : 사이트에 추가된 게시판 }
        if (this.name === '' || this.name === null) {
            throw new Error();
        }
    }
    publish(article) {
        // site에 추가된 Board가 아니면 throw
        if(this.name==='사이트에 추가되지 않은 게시판') {
            throw Error();
        }
        return this.boards.push(article)
    }
    getAllArticles() {
        return Object(this.boards)
    }
}

class Article extends Board{
    constructor(articleContents) {
        super()
        this.articleContents = articleContents
        this.article = [];
        if(!articleContents) {
            return;
        }
        this.subject = articleContents.subject
        this.content = articleContents.content
        this.author = articleContents.author
        this.id = "공지사항-"
        this.createdDate = new Date().toISOString() //Article에 Comment를 추가할 때 Comment에 작성 일자가 들어가야 한다.
        if (this.subject == null || this.content == null || this.author == null || 
           this.subject == '' || this.content == '' || this.author == '' )   {      //Article은 subject, content, author 3개의 데이터를 포함해야 하며 null 또는 빈 문자열("")은 허용하지 않는다.
           throw Error();
        }
    }
    reply(comment) {
     if(this.subject == '아직 게시하지 않은 공지사항입니다.' ) {
         throw Error();
     }
        else if (
            comment.commentContent.content == null || comment.commentContent.content == '' ||  
            comment.commentContent.author == null ||comment.commentContent.author == '' )   {
            throw Error();
        }   //Comment는 content, author 2개의 데이터를 포함해야 하며 null 또는 빈 문자열("")은 허용하지 않는다.
        this.article.push(comment)
        console.log("1", this.article[0])       //작성된 Comment 목록을 조회 할 수 있어야 한다.
        return this.article
    }
    getAllComments() {
        return Object(this.article)     //작성된 Comment 목록을 조회 할 수 있어야 한다.
    }
 }


class Comment extends Article {
    constructor(commentContent) {
        super()
        this.createdDate = new Date().toISOString() //Article에 Comment를 추가할 때 Comment에 작성 일자가 들어가야 한다.
        this.commentContent = commentContent
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
