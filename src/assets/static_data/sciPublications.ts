export const sciPublications = [
    {
        title: 'Efficient sign language recognition system and dataset creation method based on deep learning and image processing',
        description: '<p>New deep-learning architectures are created every year, achieving state-of-the-art results in image recognition and leading to the belief that, in a few years, complex tasks such as sign language translation will be considerably easier, serving as a communication tool for the hearing-impaired community. On the other hand, these algorithms still need a lot of data to be trained and the dataset creation process is expensive, time-consuming, and slow. Thereby, this work aims to investigate techniques of digital image processing and machine learning that can be used to create a sign language dataset effectively. We argue about data acquisition, such as the frames per second rate to capture or subsample the videos, the background type, preprocessing, and data augmentation, using convolutional neural networks and object detection to create an image classifier and comparing the results based on statistical tests. Different datasets were created to test the hypotheses, containing 14 words used daily and recorded by different smartphones in the RGB color system. We achieved an accuracy of 96.38% on the test set and 81.36% on the validation set containing more challenging conditions, showing that 30 FPS is the best frame rate subsample to train the classifier, geometric transformations work better than intensity transformations, and artificial background creation is not effective to model generalization. These trade-offs should be considered in future work as a cost-benefit guideline between computational cost and accuracy gain when creating a dataset and training a sign recognition model.</p>',
        thumbnail: '../../../assets/img/publications/efficient_sign_language.png',
        pubDate: '2021/6/30',
        link: 'https://www.spiedigitallibrary.org/conference-proceedings-of-spie/11878/1187803/Efficient-sign-language-recognition-system-and-dataset-creation-method-based/10.1117/12.2601018.short',
        author: 'CARNEIRO, AL Cavalcante; SILVA, L. Brito; SALVADEO, DH Pinheiro.',
        guid: '',
        content: '',
        enclosure: '',
        categories: []
    },
    {
        title: 'Artificial intelligence for detection and quantification of rust and leaf miner in coffee crop',
        description: '<p>Pest and disease control plays a key role in agriculture since the damage caused by these agents are responsible for a huge economic loss every year. Based on this assumption, we create an algorithm capable of detecting rust (Hemileia vastatrix) and leaf miner (Leucoptera coffeella) in coffee leaves (Coffea arabica) and quantify disease severity using a mobile application as a high-level interface for the model inferences. We used different convolutional neural network architectures to create the object detector, besides the OpenCV library, k-means, and three treatments: the RGB and value to quantification, and the AFSoft software, in addition to the analysis of variance, where we compare the three methods. The results show an average precision of 81,5% in the detection and that there was no significant statistical difference between treatments to quantify the severity of coffee leaves, proposing a computationally less costly method. The application, together with the trained model, can detect the pest and disease over different image conditions and infection stages and also estimate the disease infection stage.</p>',
        thumbnail: '../../../assets/img/publications/coffee_crop.png',
        pubDate: '2021/3/20',
        link: 'https://arxiv.org/abs/2103.11241',
        author: 'CARNEIRO, AL Cavalcante; SILVA, L. Brito; FAULIN, Marisa Silveira Almeida Renaud. ',
        guid: '',
        content: '',
        enclosure: '',
        categories: []
    },
    {
        title: 'Large-scale dataset and benchmarking for hand and face detection focused on sign language',
        description: '<p>Object detection is an important preprocessing technique for sign language recognition, allowing focus on the most important parts of the image. This paper introduces a new large-scale dataset for hand and face detection in sign language context, mitigating the lack of data for this problem. We evaluated different object detection architectures to find the best trade-off between computational cost and mean Average Precision (mAP). The proposed dataset contains 477,480 annotated images. The most accurate detector (CenterNet) achieved an mAP of 96.7%. Furthermore, the optimizations made to the models reduced the inference time up to 74% in the best scenario.</p>',
        thumbnail: '../../../assets/img/publications/large_scale_dataset.png',
        pubDate: '2023/10/6',
        link: 'https://www.esann.org/sites/default/files/proceedings/2023/ES2023-185.pdf',
        author: 'CARNEIRO, AL Cavalcante; SALVADEO, DH Pinheiro; SILVA, L. Brito.',
        guid: '',
        content: '',
        enclosure: '',
        categories: []
    },
    {
        title: 'Self-Supervised Feature Extraction for Video Surveillance Anomaly Detection',
        description: '<p>The recent studies on Video Surveillance Anomaly Detection focus only on the training methodology, utilizing pre-extracted feature vectors from videos. They give little attention to methodologies for feature extraction, which could enhance the final anomaly detection quality. Thus, this work presents a self-supervised methodology named Self-Supervised Object-Centric (SSOC) for extracting features from the relationship between objects in videos. To achieve this, a pretext task is employed to predict the future position and appearance of a reference object based on a set of past frames. The Deep Learning-based model used in the pretext task is then fine-tuned on Weak Supervised datasets for the downstream task, using the Multiple Instance Learning training strategy, with the goal of detecting anomalies in the videos. In the best case scenario, the results demonstrate an increase of 3.1% in AUC on the UCF Crime dataset and an increase of 2.8% in AUC on the CamNuvem dataset.</p>',
        thumbnail: '../../../assets/img/publications/self_supervised_feature_extraction.png',
        pubDate: '2023/12/18',
        link: 'https://ieeexplore.ieee.org/abstract/document/10347173',
        author: 'DE PAULA, Davi D. et al.',
        guid: '',
        content: '',
        enclosure: '',
        categories: ['Training', 'Graphics', 'Feature extraction', 'Video surveillance', 'Task analysis', 'Anomaly detection']
    }
];
