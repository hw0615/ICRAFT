/*global Cognito _config AmazonCognitoIdentity AWSCognito*/

var Cognito = window.Cognito || {};

(function rideScopeWrapper($) {
    // check auth
    var authToken;
    Cognito.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    // get all article list
    function getAllArticles() {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/circuit',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({}),
            contentType: 'application/json',
            success: completeAllArticlesRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting news: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your news:\n' + jqXHR.responseText);
            }
        });
    }
    function completeAllArticlesRequest(result) {
        console.log('Response received from API: ', result);
        for (i = 0; i < result.length; i++) {
            displayUpdate(result[i])
        }
    }

    // get single article
    function getArticle(article_id) {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/circuit',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                'article_id': article_id
            }),
            contentType: 'application/json',
            success: completeArticleRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting news: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your news:\n' + jqXHR.responseText);
            }
        });
    }
    function completeArticleRequest(result) {
        console.log('Response received from API: ', result);
        $('#article-title').val(result.title);
        $('#summernote').summernote('code', result.body);
    }

    // post article
    function postArticle(article_id, title, body) {
        $.ajax({
            type: 'POST',
            url: _config.api.invokeUrl + '/pit-in',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                'article_id': article_id,
                'title': title,
                'body': body
            }),
            contentType: 'application/json',
            success: completePostArticleRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                // TODO: Error 나는 부분 그냥 넘어감. 왜 일어나는지는 알아야함.
                window.location.href = 'circuit.html';
                // console.error('Error posting news: ', textStatus, ', Details: ', errorThrown);
                // console.error('Response: ', jqXHR.responseText);
                // alert('An error occured when posting your news:\n' + jqXHR.responseText);
            }
        });
    }
    function completePostArticleRequest(result) {
        console.log('Successfully posting, ' + result);
        window.location.href = 'circuit.html';
    }

    // Initialize
    $(function onDocReady() {
        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }

        // load datas
        var article_id = getUrlParam('article');
        if (article_id == undefined) { // circuit.html
            getAllArticles();
        } else { // pit-in.html
            $('#article_id').val(article_id);
            article = getArticle(article_id);
        }

        // set click methods
        $('#signOut').click(function () {
            Cognito.signOut();
            alert("You have been signed out.");
            window.location = "signin.html";
        });
        // set method in circuit.html
        $('.get-article').click(function () {
            window.location = $(this).data('href');
        });
        $('#postForm').submit(handlePostArticle);
    });

    function displayUpdate(text) {
        $('#updates').append($(
            '<tr>' +
            '<td>' + text['id'] + '</td>' +
            '<td>' + '<a href="/pit-in.html?article=' + text['id'] + '">' +
            text['title'] + '</a></td>' +
            '<td>' + text['date'] + '</td>' +
            '<td>' + text['count'] + '</td>' +
            '<td>' + 'Not Yet' + '</td>' +
            '</tr>'
        ));
    }

    function getUrlParam(param) {
        var queryString = window.location.search.slice(1);
        var result;
        if (queryString) {
            // get rid of stuff after #
            queryString = queryString.split('#')[0];
            var arr = queryString.split('&');

            for (var i = 0; i < arr.length; i++) {
                var a = arr[i].split('=');

                if (a[0] == param) {
                    return a[1]
                }
            }
            return result;
        }
        else {
            return result;
        }
    }

    function handlePostArticle(event){
        var article_id = $('#article_id').val();
        var title = $('#article-title').val();
        var body = $('#summernote').summernote('code');
        event.preventDefault();

        console.log(article_id);

        if (article_id == undefined) {
            postArticle(-1, title, body)
        } else {
            postArticle(article_id, title, body);
        }
    }
}(jQuery));