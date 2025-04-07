// Sample book data (in a real app, this would come from your backend/database)
const sampleBooks = [
    {
        id: '1',
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/81%2Bx5jVijBL.jpg',
        description: 'Alicia Berenson’s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London’s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.',
        rating: 4.5,
        pages: 336,
        genres: ['mystery', 'thriller', 'fiction'],
        published: '2019',
        reviews: [
            {
                user: 'BookLover42',
                rating: 5,
                date: 'June 15, 2020',
                content: 'One of the best psychological thrillers I\'ve ever read! The twist at the end completely blew my mind.'
            },
            {
                user: 'ReadingRainbow',
                rating: 4,
                date: 'August 2, 2020',
                content: 'Great character development and an unpredictable plot. Kept me guessing until the very end.'
            }
        ]
    },
    {
        id: '2',
        title: 'Where the Crawdads Sing',
        author: 'Delia Owens',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/81O1oy0y9eL.jpg',
        description: 'For years, rumors of the "Marsh Girl" have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say. Sensitive and intelligent, she has survived for years alone in the marsh that she calls home, finding friends in the gulls and lessons in the sand.',
        rating: 4.8,
        pages: 384,
        genres: ['fiction', 'mystery', 'romance'],
        published: '2018',
        reviews: [
            {
                user: 'NatureReader',
                rating: 5,
                date: 'January 10, 2021',
                content: 'A beautiful, haunting novel that combines nature writing with mystery and romance. The descriptions of the marsh are breathtaking.'
            },
            {
                user: 'LiteraryFan',
                rating: 5,
                date: 'March 22, 2021',
                content: 'The character of Kya will stay with me forever. This book is a masterpiece of storytelling.'
            }
        ]
    },
    {
        id: '3',
        title: 'Educated',
        author: 'Tara Westover',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/71rkg5tlWTL.jpg',
        description: 'Tara Westover was seventeen the first time she set foot in a classroom. Born to survivalists in the mountains of Idaho, she prepared for the end of the world by stockpiling home-canned peaches and sleeping with her "head-for-the-hills bag". In the summer she stewed herbs for her mother, a midwife and healer, and in the winter she salvaged in her father\'s junkyard.',
        rating: 4.7,
        pages: 352,
        genres: ['memoir', 'biography', 'non-fiction'],
        published: '2018',
        reviews: [
            {
                user: 'MemoirReader',
                rating: 5,
                date: 'November 5, 2019',
                content: 'An incredible story of resilience and the power of education. Tara\'s journey is both heartbreaking and inspiring.'
            },
            {
                user: 'TruthSeeker',
                rating: 4,
                date: 'February 14, 2020',
                content: 'The writing is superb and the story is unforgettable. Makes you think about family, education, and what it means to find your own path.'
            }
        ]
    },
    {
        id: '4',
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/91B7d%2B+vA5L.jpg',
        description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn\'t know that. He can\'t even remember his own name, let alone the nature of his assignment or how to complete it. All he knows is that he\'s been asleep for a very, very long time. And he\'s just been awakened to find himself millions of miles from home, with nothing but two corpses for company.',
        rating: 4.6,
        pages: 496,
        genres: ['science fiction', 'adventure', 'fiction'],
        published: '2021',
        reviews: [
            {
                user: 'SciFiNerd',
                rating: 5,
                date: 'May 30, 2021',
                content: 'Even better than The Martian! Andy Weir does it again with this brilliant mix of hard science and heartwarming storytelling.'
            },
            {
                user: 'SpaceExplorer',
                rating: 4,
                date: 'July 12, 2021',
                content: 'The science is fascinating and the alien character is one of the most original I\'ve encountered in sci-fi. Highly recommended!'
            }
        ]
    },
    {
        id: '5',
        title: 'The Midnight Library',
        author: 'Matt Haig',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/81Jc4F%2B1QkL.jpg',
        description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?',
        rating: 4.2,
        pages: 304,
        genres: ['fiction', 'fantasy', 'contemporary'],
        published: '2020',
        reviews: [
            {
                user: 'Dreamer123',
                rating: 5,
                date: 'December 8, 2020',
                content: 'A beautiful, thought-provoking novel about choices and regrets. Made me reflect on my own life in profound ways.'
            },
            {
                user: 'BookWorm',
                rating: 4,
                date: 'January 25, 2021',
                content: 'The concept is brilliant and the execution is mostly great. Some parts dragged a bit, but overall a wonderful read.'
            }
        ]
    },
    {
        id: '6',
        title: 'Atomic Habits',
        author: 'James Clear',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg',
        description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
        rating: 4.7,
        pages: 320,
        genres: ['self-help', 'non-fiction', 'psychology'],
        published: '2018',
        reviews: [
            {
                user: 'GoalGetter',
                rating: 5,
                date: 'April 5, 2021',
                content: 'Life-changing book! The 1% improvement concept has completely transformed how I approach my daily habits.'
            },
            {
                user: 'ProductivityPro',
                rating: 5,
                date: 'June 18, 2021',
                content: 'Clear, practical advice backed by science. This is the best book on habits I\'ve ever read.'
            }
        ]
    },
    {
        id: '7',
        title: 'Dune',
        author: 'Frank Herbert',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/81ym3QUd3KL.jpg',
        description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness. When his family is betrayed, Paul must lead the Fremen, the natives of Arrakis, in a battle for control of the planet and its spice.',
        rating: 4.8,
        pages: 688,
        genres: ['science fiction', 'fantasy', 'classic'],
        published: '1965',
        reviews: [
            {
                user: 'SciFiMaster',
                rating: 5,
                date: 'October 12, 2020',
                content: 'The greatest science fiction novel ever written. The world-building is unparalleled and the themes are timeless.'
            },
            {
                user: 'DesertWalker',
                rating: 4,
                date: 'February 28, 2021',
                content: 'A complex, richly detailed masterpiece. It takes some effort to get into, but it\'s absolutely worth it.'
            }
        ]
    },
    {
        id: '8',
        title: 'The Song of Achilles',
        author: 'Madeline Miller',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/81s6DUyQCZL.jpg',
        description: 'Greece in the age of heroes. Patroclus, an awkward young prince, has been exiled to the court of King Peleus and his perfect son Achilles. Despite their differences, Achilles befriends the shamed prince, and as they grow into young men skilled in the arts of war and medicine, their bond blossoms into something deeper - despite the displeasure of Achilles\' mother Thetis, a cruel sea goddess.',
        rating: 4.6,
        pages: 416,
        genres: ['historical fiction', 'romance', 'fantasy'],
        published: '2011',
        reviews: [
            {
                user: 'MythLover',
                rating: 5,
                date: 'July 7, 2021',
                content: 'A breathtaking retelling of the Iliad. The prose is beautiful and the love story is heartbreakingly perfect.'
            },
            {
                user: 'ClassicsFan',
                rating: 5,
                date: 'August 19, 2021',
                content: 'Madeline Miller brings ancient Greece to life in this stunning novel. I couldn\'t put it down and cried at the end.'
            }
        ]
    }
];