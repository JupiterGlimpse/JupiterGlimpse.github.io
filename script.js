


let currentIndex = 0;
let images = [];

function loadImages() {
    fetch('/images')
        .then(response => response.json())
        .then(data => {
            images = data;
            if (images.length > 0) {
                showImage(currentIndex);
            }
        })
        .catch(error => console.error('Error fetching images:', error));
}

function showImage(index) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = 'images/' + images[index];
}

function prevImage() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    showImage(currentIndex);
}

function nextImage() {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    showImage(currentIndex);
}




// 文章内容
const articles = {
    '2024.03': {
        title: '2024年4月以前',
        content: `
            🫧

            纸巾，擦一下。
            有小熊、小狗和小面包。如果很不开心，就盯着他们看。

            🌳

            没意识到自己哭了。没意识到自己很不开心。觉得这是自己该做的，是一种惩罚。
            

            🫧

            划开了你的一枝茎。瘦瘦的、细细的，很漂亮。但是发现你特别讨厌自己，在很深很深的地方。

            🌳

            真的很漂亮吗？我好像从来没有敢向别人确认。漂亮好像对我没什么用。”摊手，怔怔地不知道望向哪里。
        `.trim().split('\n').map(line => line.trim())
    }
};

console.log(articles);

// 加载文章内容函数
function loadArticle() {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('article');
    const article = articles[articleId];

    if (article) {
        document.getElementById('article-title').innerText = article.title;
        const contentElement = document.getElementById('article-content');
        contentElement.innerHTML = '';
        article.content.forEach(paragraph => {
            const p = document.createElement('p');
            p.innerText = paragraph;
            contentElement.appendChild(p);
        });
    } else {
        document.getElementById('article-title').innerText = 'Article Not Found';
        document.getElementById('article-content').innerHTML = '<p>Sorry, the article you are looking for does not exist.</p>';
    }
}



// DOM内容加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 检查页面是否包含特定的元素，以确定当前页面类型
    if (document.getElementById('mainImage')) {
        // 如果包含mainImage元素，则执行照片页面的逻辑
        loadImages();
        document.querySelector('.prev').addEventListener('click', prevImage);
        document.querySelector('.next').addEventListener('click', nextImage);
    } else if (document.getElementById('article-title')) {
        // 如果包含article-title元素，则执行文章页面的逻辑
        loadArticle();
    }
});
