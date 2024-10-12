# <span id="top">📃 Dear Therapy</span>

### 👀 팀 소개
<table border="1" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td width="25%" align="center"><a href="https://github.com/leeeeejieun">이지은</a></td>
        <td width="25%" align="center"><a href="https://github.com/two0627">이경윤</a></td>
        <td width="25%" align="center"><a href="https://github.com/HJK013">김현지</a></td>
        <td width="25%" align="center"><a href="https://github.com/PSO01">박새온</a></td>
    </tr>
    <tr>
        <td align="center"><img src="https://github.com/leeeeejieun.png" alt="이지은"></td>
        <td align="center"><img src="https://github.com/two0627.png" alt="이경윤"></td>
        <td align="center"><img src="https://github.com/HJK013.png" alt="김현지"></td>
        <td align="center"><img src="https://github.com/PSO01.png" alt="박새온"></td>
    </tr>
    <tr>
        <td align="center">팀장</td>
        <td align="center">팀원</td>
        <td align="center">팀원</td>
        <td align="center">팀원</td>
    </tr>
    <tr>
        <td align="center">백엔드 담당</td>
        <td align="center">백엔드 담당</td>
        <td align="center">프론트엔드 담당</td>
        <td align="center">프론트엔드 담당</td>
    </tr>
</table>

<br>

### 📢 Commit Message Rules

- 작은 기능이라도 구현이 완료되면 커밋하여 반영 사항을 확인할 수 있도록 합니다.
- 커밋 유형 이후 제목과 본문은 한글로 작성하여 내용이 잘 전달될 수 있도록 합니다.
- 커밋 메시지는 누구나 이해할 수 있게 작성합니다.


<br>

### 📌 Commit Convention

**[커밋 유형]: 커밋 메시지**

| 커밋 유형 |                       의미                        |
| :-------: | :-----------------------------------------------: |
|   FEAT    |             새로운 기능 추가                       |
|    FIX    |                 버그 수정                          |
|   DESIGN   |                UI 디자인 변경                     |
|   CHORE   |           패키지 매니저 수정, 기타 수정             |
|   DOCS    |                 문서 수정                          |
|  RENAME   |         파일 또는 폴더 명을 수정 및 이동            |
|  REMOVE   |            파일 또는 폴더 삭제                     |
|   STYLE   |          코드 의미와 무관한 변경 사항               |
| REFACTOR  |               코드 리팩토링                        |

예시 >

```
  [FEAT] 로그인 기능 구현 
```


<br>

### 📌 Code Convention
#### 문자열
- 문자열을 처리할 때는 쌍따옴표를 사용하도록 합니다.

#### 상수
- 상수는 영문 대문자, 스네이크 표기법을 사용하여 작성합니다.
```
여러 단어의 합성어일 경우 단어 사이를 하이픈('-')으로 연결합니다.

const SERVER_URL = "http~"; 
```

#### 컴포넌트
- 파스칼 케이스로 작성하며 파일의 확장자는 .jsx로 작성합니다.
```
첫 번째 글자만 대문자로 하고, 두 단어 이상의 합성어일 경우 각 단어의 첫 글자를 대문자로 합니다.

LoginPage.jsx
Button.jsx
```

#### 컴포넌트 외 파일명 및 함수/변수명
- 카멜케이스로 작성합니다.
```
첫 단어는 소문자로 시작하며, 두 단어의 합성어일 경우 두 번째 단어부터는 첫 글자를 대문자로 합니다.

theme.js
user.js
userStroage.js
```

#### 함수 선언
- 화살표 함수를 사용합니다.
```
const handleClick = () => {
    console.log("클릭");
};
```

<br>

### 📌 Gitfolw Rules
1. devleop 브랜치에 직접적인 commit, push는 금지합니다.
   - 모든 작업은 각자의 feature 브랜치에서 진행됩니다.
     
2. 기능 구현 시작 전 issue를 생성합니다.
   - projects 탭에서 해당 기능과 관련된 issue를 작성하고, issue에 맞는feature 브랜치를 생성합니다.
  
3. 기능 구현이 완료되지 않은 경우에는 각자의 feature 브랜치에 커밋을 진행하며, 완료되면 develop 브랜치로 PR을 보냅니다.
  
4. PR은 팀장의 코드 리뷰가 완료된 후 devleop 브랜치에 merge 할 수 있습니다.  


<br>
