class Terms {
    render() {
        const htmlTerms = `
       <div class="terms-box">
            <h1>To become a translator, certain conditions must be met, including:</h1>
            <ul>
                <li>1. Language proficiency: Translators must have an excellent command of at least two languages, including their native language and the language they are translating into. They need to have a deep understanding of grammar, vocabulary, idiomatic expressions, and cultural nuances of both languages.</li>
                <li>2. Education and training: While not mandatory, a degree in translation or a related field can be beneficial. Formal training in translation techniques and tools, such as computer-assisted translation (CAT) tools, can also improve a translator's skills.</li>
                <li>3. Specialization and subject knowledge: Translators often choose to specialize in specific fields, such as legal, medical, technical, or literary translation. In-depth subject knowledge is essential for accurate and contextually appropriate translations.</li>
                <li>4. Experience: Experience in translation, gained through internships, volunteer work, or professional projects, is valuable to establish credibility and improve skills.</li>
                <li>5. Cultural awareness: Translators must have a strong awareness of cultural differences and be able to adapt translations accordingly. This includes understanding social norms, customs, and cultural references.</li>
                <li>6. Excellent research and organizational skills: Translators should be adept at conducting research to find specialized terminologies and industry-specific information. They must also be highly organized to manage and prioritize translation projects effectively.</li>
                <li>7. Time management and ability to meet deadlines: Translators often work on tight deadlines, so they must be able to manage their time efficiently and work under pressure.</li>
                <li>8. Professional ethics: Translators must adhere to strict ethical standards, maintaining confidentiality, impartiality, and accuracy in their translations. They should also respect client preferences and follow agreed-upon guidelines.</li>
                <li>9. Continuous learning: The translation field is constantly evolving, with new technologies and terminology emerging. Translators should be committed to continuous professional development by attending workshops, conferences, and staying updated with industry trends and best practices.</li>
                <li>10. Networking and marketing skills: Translators, especially freelancers, need to have good networking and marketing skills to find clients, build professional relationships, and promote their services.</li>
            </ul>
            <button onclick="Back()" style="margin-top: 15px" class="login-btn">Back</button>
       </div>
    `

        ROOT_terms.innerHTML = htmlTerms;
    }

}

const termsPage = new Terms();
termsPage.render();

function Back() {
    const loginPage = document.querySelector('#login')
    loginPage.classList.remove('hide')
    const termsPage = document.querySelector('#terms')
    termsPage.classList.add('hide')
}
