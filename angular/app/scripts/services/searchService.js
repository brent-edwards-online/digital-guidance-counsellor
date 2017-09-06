'use strict';

angular.module('dgcApp')
        .service('searchFactory', [function() {
            function dfs(node, amount, resultList)
            {
                if(node.value !== undefined)
                {
                    resultList.push(node.value);
                    if(resultList.length >= amount) {
                        return;
                    }
                }

                for (var key in node.children) {
                    var nextNode = node.children[key];
                    dfs(nextNode, amount, resultList);    
                    if(resultList.length >= amount) {
                        return;
                    }
                }
            }

            function searchTrie(textToFind) {
                var result = [];
                var currentNode = trie;
                textToFind.toLowerCase().split("").forEach(function(c) {
                    var foundNode = currentNode.children[c];
                    if(foundNode!==undefined) {
                        currentNode = foundNode;
                    }
                });

                dfs(currentNode, 4, result);
                return result;
            }

            this.search = function(inputText)
            {
                if(inputText==="") {
                    return [];
                }
                return searchTrie(inputText);
            };

            
            var questions = [
                'Show me jobs in Queensland',
                'Show me jobs in Bulimba',
                'Show me jobs that are hiring',
                'Show me how to write a resume',
                'Show me how to find a job',
                'Show me how to get get trained in IT',
                'Show me training in my area',
                'Show me training about IT',
                'Show me how to be a vet',
                'Show me where to get funding',
                'Show me what is a good career',
                'Show me where I can get advice',
                'Show me jobs in Brisbane',
                'Show me IT jobs',
                'Show me IT training',
                'Show me IT funding',
                'How to get a job',
                'How to get free training',
                'How to get job advice',
                'How to get to my interview',
                'How to write a resume',
                'Resume writing skills',
                'Resume templates',
                'Resume services',
                'What should I put in my resume',
                'Where can I get a job',
                'How can I get a job',
                'How to prepare for an interview',
                'How to get free training',
                'How to get job experience',
                'How do I get to my interview',
                'Where can I get job experience',
                'Where to go for job advice',
                'Where do I go for training advice',
                'What career should I choose',
                'Advice on careers',
                'Advice on training',
                'Advice on benefits',
                'Qualifications for IT',
                'Resume writing skills',
                'Help me with my resume',
                'Help me get a job',
                'Help me find a job',
                'Help with job search',
                'Help finding work',
                'Show me about resumes',
                'Show me where to find work',
                'Show me where to get training',
                'Show me where to get work experience',
                'Show me where to get experience',
                'Show me where to get support',
                'Show me where to get advice',
                'Advice on job search'
            ];
            
            
            function createTrie(questionList) {
                
                var root = {
                    key: null,
                    children: []
                };

                questionList.forEach(function(element) {
                    var currentNode = root;
                    element.toLowerCase().split("").forEach(function(c){
                        var foundNode = currentNode.children[c];
                        if(foundNode===undefined){
                            var newNode = {
                                key: c,
                                children: []
                            };
                            currentNode.children[c] = newNode;
                            currentNode = newNode;
                        }
                        else {
                            
                            currentNode = foundNode;
                        }
                    });

                    currentNode.value = element;
                });

                return root;
            }
            
            var trie = createTrie(questions);
            
        }]);
