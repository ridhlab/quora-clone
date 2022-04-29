const Logo = ({ color }) => {
    return (
        <svg width="150" height="23" viewBox="0 0 150 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.3633 20.0391C15.707 20.0391 16.7227 19.5586 17.4102 18.5977C17.6055 18.707 17.7656 18.8086 17.8906 18.9023C18.2109 19.1523 18.3711 19.5078 18.3711 19.9688C18.3711 20.7031 18.0781 21.3047 17.4922 21.7734C16.9062 22.25 16.2266 22.4883 15.4531 22.4883C14.6875 22.4883 13.9922 22.418 13.3672 22.2773C12.75 22.1367 12.2422 21.9844 11.8438 21.8203C10.7812 21.3672 9.41016 21.1406 7.73047 21.1406C7.54297 20.7734 7.44922 20.3906 7.44922 19.9922C7.44922 19.5938 7.48828 19.3203 7.56641 19.1719C8.04297 19.0859 8.46094 19.043 8.82031 19.043C9.1875 19.043 9.51562 19.0664 9.80469 19.1133C10.1016 19.168 10.3594 19.2305 10.5781 19.3008C10.7969 19.3789 11.043 19.4609 11.3164 19.5469C11.5977 19.6328 11.8711 19.7109 12.1367 19.7812C12.7539 19.9531 13.4961 20.0391 14.3633 20.0391ZM17.9141 9.21094C17.9141 11.4375 17.4141 13.3203 16.4141 14.8594C15.4141 16.3906 13.9766 17.4375 12.1016 18C11.2031 18.2656 10.2266 18.3984 9.17188 18.3984C8.125 18.3984 7.07422 18.2109 6.01953 17.8359C4.96484 17.4531 4.01953 16.918 3.18359 16.2305C2.35547 15.5352 1.69141 14.6484 1.19141 13.5703C0.691406 12.4922 0.441406 11.3047 0.441406 10.0078C0.441406 7.58594 1 5.62109 2.11719 4.11328C3.23438 2.60547 4.84375 1.57031 6.94531 1.00781C7.67188 0.8125 8.44531 0.714844 9.26562 0.714844C10.0938 0.714844 10.9258 0.828125 11.7617 1.05469C12.5977 1.28125 13.3828 1.62891 14.1172 2.09766C14.8594 2.56641 15.5156 3.125 16.0859 3.77344C17.3047 5.16406 17.9141 6.97656 17.9141 9.21094ZM5.79688 14.7422C6.28125 15.3672 6.84375 15.8477 7.48438 16.1836C8.125 16.5195 8.80078 16.6875 9.51172 16.6875C10.2227 16.6875 10.8516 16.5586 11.3984 16.3008C11.9531 16.043 12.4062 15.7031 12.7578 15.2812C13.1094 14.8516 13.4023 14.3438 13.6367 13.7578C14.0586 12.7031 14.2695 11.4531 14.2695 10.0078C14.2695 7.8125 13.75 6.00391 12.7109 4.58203C11.6719 3.16016 10.3984 2.44922 8.89062 2.44922C8.29688 2.44922 7.71875 2.55859 7.15625 2.77734C6.60156 2.99609 6.12109 3.34766 5.71484 3.83203C5.31641 4.30859 5.01562 4.85938 4.8125 5.48438C4.42188 6.64062 4.22656 7.83984 4.22656 9.08203C4.22656 10.3242 4.36719 11.4219 4.64844 12.375C4.92969 13.3281 5.3125 14.1172 5.79688 14.7422ZM20.9844 7.35938C20.4688 7.35938 20.2109 7.13672 20.2109 6.69141C20.2109 6.56641 20.2188 6.47266 20.2344 6.41016C20.5078 6.21484 21.1758 6.02734 22.2383 5.84766C23.3008 5.66016 24.1602 5.56641 24.8164 5.56641C25.0586 6.35547 25.1797 7.24219 25.1797 8.22656C25.1797 9.21094 25.1289 10.3359 25.0273 11.6016C24.9336 12.8594 24.8867 13.7461 24.8867 14.2617C24.8867 14.7773 24.9648 15.1953 25.1211 15.5156C25.2773 15.8281 25.5977 15.9844 26.082 15.9844C26.5742 15.9844 27.0781 15.8672 27.5938 15.6328C28.1172 15.3906 28.7812 14.9492 29.5859 14.3086C29.5859 11.9023 29.5938 9.04297 29.6094 5.73047C30.5078 5.58984 31.2305 5.51953 31.7773 5.51953C32.332 5.51953 32.8125 5.58984 33.2188 5.73047C33.1016 7.44141 33.043 9.08594 33.043 10.6641C33.043 12.2344 33.0859 13.8711 33.1719 15.5742C33.1875 15.832 33.2383 16.0312 33.3242 16.1719C33.4102 16.3125 33.6328 16.3945 33.9922 16.418C34.3594 16.4414 34.6133 16.4805 34.7539 16.5352C34.7852 16.6992 34.8008 16.9648 34.8008 17.332C34.1211 17.7148 33.4375 17.9883 32.75 18.1523C32.0625 18.3242 31.4805 18.4102 31.0039 18.4102C30.5273 18.4102 30.1992 18.2344 30.0195 17.8828C29.8477 17.5312 29.7109 16.8281 29.6094 15.7734C27.7031 17.5312 25.8828 18.4102 24.1484 18.4102C22.4141 18.4102 21.5469 17.0352 21.5469 14.2852L21.7461 8.08594C21.7461 7.82031 21.6641 7.63281 21.5 7.52344C21.3438 7.41406 21.1719 7.35938 20.9844 7.35938ZM50.375 11.625C50.375 12.6484 50.1914 13.6094 49.8242 14.5078C49.457 15.4062 48.9375 16.1406 48.2656 16.7109C46.9141 17.8594 45.1289 18.4336 42.9102 18.4336C41.8008 18.4336 40.7773 18.1719 39.8398 17.6484C38.9023 17.125 38.1562 16.3945 37.6016 15.457C37.0469 14.5117 36.7695 13.3867 36.7695 12.082C36.7695 10.7695 37.1055 9.58984 37.7773 8.54297C39.0977 6.48047 41.3125 5.44922 44.4219 5.44922C45.9844 5.44922 47.3555 5.98438 48.5352 7.05469C49.7617 8.17188 50.375 9.69531 50.375 11.625ZM40.2266 11.9648C40.2266 13.3008 40.6133 14.4688 41.3867 15.4688C42.1602 16.4688 43.0664 16.9688 44.1055 16.9688C46.0273 16.9688 46.9883 15.4023 46.9883 12.2695C46.9883 10.7148 46.6328 9.45312 45.9219 8.48438C45.2109 7.51562 44.3047 7.03125 43.2031 7.03125C42.6484 7.03125 42.168 7.17188 41.7617 7.45312C41.3555 7.73438 41.0469 8.11328 40.8359 8.58984C40.4297 9.50391 40.2266 10.6289 40.2266 11.9648ZM61.1211 10.1367C61.1211 8.80078 60.8164 8.13281 60.207 8.13281C59.7617 8.13281 59.3359 8.26172 58.9297 8.51953C58.5234 8.76953 58.0859 9.12109 57.6172 9.57422C57.6172 10.3555 57.5938 13.1719 57.5469 18.0234C56.6797 18.1719 55.9688 18.2461 55.4141 18.2461C54.8672 18.2461 54.3945 18.1719 53.9961 18.0234C54.0898 16.7266 54.1367 14.5039 54.1367 11.3555V8.61328C54.1367 8.01953 53.9297 7.66797 53.5156 7.55859C53.2344 7.47266 52.8555 7.41016 52.3789 7.37109C52.3242 7.13672 52.2969 6.96094 52.2969 6.84375C52.2969 6.71875 52.3008 6.62109 52.3086 6.55078C53.4336 5.91797 54.8242 5.60156 56.4805 5.60156C56.7539 5.60156 56.957 5.60547 57.0898 5.61328C57.3164 6.00391 57.4492 6.41016 57.4883 6.83203C57.5352 7.25391 57.5703 7.65625 57.5938 8.03906C58.6406 6.76562 59.5234 5.99219 60.2422 5.71875C60.5859 5.58594 60.9492 5.51953 61.332 5.51953C62.1133 5.51953 62.7383 5.73828 63.207 6.17578C63.6836 6.60547 63.9219 7.23828 63.9219 8.07422C63.9219 8.71484 63.6875 9.25 63.2188 9.67969C62.7578 10.1016 62.1992 10.3125 61.543 10.3125C61.4023 10.3125 61.2617 10.3008 61.1211 10.2773V10.1367ZM76.8711 11.3789L76.8008 15.3164C76.8008 15.3555 76.8008 15.3945 76.8008 15.4336C76.8008 15.8633 77.0039 16.0781 77.4102 16.0781C77.7227 16.0781 78.0547 15.9766 78.4062 15.7734C78.5156 15.8672 78.6172 16 78.7109 16.1719C78.8125 16.3359 78.8711 16.4648 78.8867 16.5586C77.918 17.793 76.9102 18.4102 75.8633 18.4102C74.8242 18.4102 74.0977 17.8984 73.6836 16.875C72.9648 17.375 72.2305 17.7539 71.4805 18.0117C70.7383 18.2773 70.0977 18.4102 69.5586 18.4102C69.0273 18.4102 68.5312 18.3516 68.0703 18.2344C67.6172 18.1172 67.1953 17.9297 66.8047 17.6719C65.9609 17.125 65.5391 16.2227 65.5391 14.9648C65.5391 14.293 65.7227 13.707 66.0898 13.207C66.4648 12.6992 66.9727 12.3008 67.6133 12.0117C68.8398 11.457 70.3047 11.1562 72.0078 11.1094L73.3672 11.0625C73.4219 10.4297 73.4492 9.92969 73.4492 9.5625C73.4492 8.73438 73.2891 8.10938 72.9688 7.6875C72.6562 7.26562 72.0703 7.05469 71.2109 7.05469C70.6953 7.05469 70.293 7.23438 70.0039 7.59375C69.7227 7.95312 69.582 8.48438 69.582 9.1875C69.582 9.28125 69.4492 9.39453 69.1836 9.52734C68.7383 9.73828 68.293 9.84375 67.8477 9.84375C67.4102 9.84375 67.0586 9.71875 66.793 9.46875C66.5352 9.21875 66.4062 8.86719 66.4062 8.41406C66.4062 7.96094 66.5703 7.53516 66.8984 7.13672C67.2266 6.73828 67.6641 6.42969 68.2109 6.21094C69.2969 5.78125 70.5352 5.56641 71.9258 5.56641C73.3789 5.56641 74.4414 5.79688 75.1133 6.25781C75.7227 6.66406 76.1562 7.24609 76.4141 8.00391C76.7188 8.88672 76.8711 10.0117 76.8711 11.3789ZM73.3672 15.6445C73.2656 15.0742 73.2148 14.582 73.2148 14.168C73.2148 13.7461 73.2266 13.1602 73.25 12.4102L71.6211 12.4805C70.7852 12.4805 70.1406 12.6836 69.6875 13.0898C69.2344 13.4961 69.0078 14.0039 69.0078 14.6133C69.0078 15.2227 69.1406 15.6602 69.4062 15.9258C69.6719 16.1914 70.207 16.3242 71.0117 16.3242C71.8242 16.3242 72.6094 16.0977 73.3672 15.6445ZM94.8242 15.9844C93.2695 17.6016 91.2852 18.4102 88.8711 18.4102C86.5977 18.4102 84.7305 17.7188 83.2695 16.3359C82.543 15.6406 81.9727 14.7305 81.5586 13.6055C81.1523 12.4727 80.9492 11.1016 80.9492 9.49219C80.9492 7.875 81.3281 6.38281 82.0859 5.01562C82.8438 3.64844 83.9062 2.58984 85.2734 1.83984C86.6484 1.08984 88.1758 0.714844 89.8555 0.714844C91.543 0.714844 93.0703 1.03516 94.4375 1.67578C94.5781 1.84766 94.6484 2.06641 94.6484 2.33203C94.6484 2.58984 94.6484 2.75781 94.6484 2.83594L94.4844 5.42578C94.0547 5.71484 93.6367 5.85938 93.2305 5.85938C92.832 5.85938 92.5156 5.80078 92.2812 5.68359C92.0469 5.55859 91.875 5.38672 91.7656 5.16797C91.5781 4.79297 91.4844 4.41797 91.4844 4.04297C91.4844 3.66016 91.4922 3.32031 91.5078 3.02344C91.0703 2.70312 90.4883 2.54297 89.7617 2.54297C89.043 2.54297 88.4609 2.61719 88.0156 2.76562C87.5781 2.90625 87.1641 3.14062 86.7734 3.46875C86.3828 3.79688 86.0508 4.20703 85.7773 4.69922C85.1836 5.76953 84.8867 7.22656 84.8867 9.07031C84.8867 11.3984 85.3945 13.1875 86.4102 14.4375C87.4336 15.6797 88.7578 16.3008 90.3828 16.3008C91.5625 16.3008 92.7305 15.8047 93.8867 14.8125C94.3398 15.0312 94.6523 15.4219 94.8242 15.9844ZM98.0938 3.04688C97.9609 2.28906 97.4648 1.85938 96.6055 1.75781C96.5508 1.375 96.5234 1.16016 96.5234 1.11328C96.5234 1.05859 96.5273 1 96.5352 0.9375C98.0117 0.359375 99.5078 0.0703125 101.023 0.0703125C101.094 0.0703125 101.168 0.0703125 101.246 0.0703125C101.41 0.28125 101.52 0.773438 101.574 1.54688C101.629 2.3125 101.656 4.10156 101.656 6.91406C101.656 9.71875 101.613 13.4141 101.527 18C101.012 18.1484 100.395 18.2227 99.6758 18.2227C98.957 18.2227 98.3984 18.1406 98 17.9766C98.1406 16.9297 98.2109 14.9336 98.2109 11.9883C98.2109 9.04297 98.1719 6.0625 98.0938 3.04688ZM117.805 11.625C117.805 12.6484 117.621 13.6094 117.254 14.5078C116.887 15.4062 116.367 16.1406 115.695 16.7109C114.344 17.8594 112.559 18.4336 110.34 18.4336C109.23 18.4336 108.207 18.1719 107.27 17.6484C106.332 17.125 105.586 16.3945 105.031 15.457C104.477 14.5117 104.199 13.3867 104.199 12.082C104.199 10.7695 104.535 9.58984 105.207 8.54297C106.527 6.48047 108.742 5.44922 111.852 5.44922C113.414 5.44922 114.785 5.98438 115.965 7.05469C117.191 8.17188 117.805 9.69531 117.805 11.625ZM107.656 11.9648C107.656 13.3008 108.043 14.4688 108.816 15.4688C109.59 16.4688 110.496 16.9688 111.535 16.9688C113.457 16.9688 114.418 15.4023 114.418 12.2695C114.418 10.7148 114.062 9.45312 113.352 8.48438C112.641 7.51562 111.734 7.03125 110.633 7.03125C110.078 7.03125 109.598 7.17188 109.191 7.45312C108.785 7.73438 108.477 8.11328 108.266 8.58984C107.859 9.50391 107.656 10.6289 107.656 11.9648ZM130.074 15.457L130.191 10.9922C130.191 9.97656 130.156 9.33594 130.086 9.07031C130.023 8.80469 129.941 8.60547 129.84 8.47266C129.621 8.19922 129.301 8.0625 128.879 8.0625C128.457 8.0625 128.098 8.10938 127.801 8.20312C127.191 8.40625 126.41 8.97656 125.457 9.91406C125.457 10.9297 125.434 13.6328 125.387 18.0234C124.52 18.1719 123.797 18.2461 123.219 18.2461C122.641 18.2461 122.152 18.1719 121.754 18.0234C121.895 16.125 121.965 14.375 121.965 12.7734C121.965 11.1641 121.945 9.77734 121.906 8.61328C121.906 8.01953 121.695 7.66797 121.273 7.55859C121.008 7.47266 120.633 7.41016 120.148 7.37109C120.102 7.16797 120.078 7.00781 120.078 6.89062C120.078 6.76562 120.094 6.65234 120.125 6.55078C121.25 5.91797 122.648 5.60156 124.32 5.60156C124.594 5.60156 124.797 5.60547 124.93 5.61328C125.234 6.13672 125.402 7.03516 125.434 8.30859C126.895 6.43359 128.605 5.49609 130.566 5.49609C131.473 5.49609 132.18 5.80469 132.688 6.42188C133.203 7.03125 133.496 7.85938 133.566 8.90625C133.598 9.38281 133.613 9.85938 133.613 10.3359C133.613 10.8125 133.59 11.3281 133.543 11.8828C133.41 13.5703 133.344 14.8633 133.344 15.7617C133.344 15.9648 133.488 16.1211 133.777 16.2305C134.066 16.3398 134.348 16.3945 134.621 16.3945C134.902 16.3945 135.094 16.3789 135.195 16.3477C135.289 16.5586 135.336 16.7539 135.336 16.9336C135.336 17.1055 135.328 17.2227 135.312 17.2852C133.852 18.043 132.762 18.4219 132.043 18.4219C131.324 18.4219 130.816 18.1797 130.52 17.6953C130.223 17.2031 130.074 16.457 130.074 15.457ZM140.938 12.9375C141.172 14.0938 141.672 15.0273 142.438 15.7383C143.203 16.4492 144.098 16.8047 145.121 16.8047C146.145 16.8047 147.176 16.3633 148.215 15.4805C148.605 15.7383 148.844 16.043 148.93 16.3945C148.211 17.2305 147.148 17.8281 145.742 18.1875C145.172 18.3359 144.512 18.4102 143.762 18.4102C143.02 18.4102 142.25 18.2734 141.453 18C140.656 17.7344 139.941 17.3438 139.309 16.8281C138.684 16.3125 138.188 15.6367 137.82 14.8008C137.453 13.957 137.27 13.0234 137.27 12C137.27 10.9766 137.457 10.0508 137.832 9.22266C138.207 8.38672 138.703 7.70312 139.32 7.17188C140.609 6.05469 142.086 5.49609 143.75 5.49609C145.211 5.49609 146.477 5.89062 147.547 6.67969C148.062 7.07031 148.473 7.57812 148.777 8.20312C149.09 8.82031 149.246 9.51953 149.246 10.3008C149.246 11.6367 148.805 12.3398 147.922 12.4102L140.938 12.9375ZM146.094 9.94922C146.094 9.01953 145.836 8.29297 145.32 7.76953C144.805 7.24609 144.129 6.98438 143.293 6.98438C142.457 6.98438 141.824 7.37891 141.395 8.16797C140.965 8.94922 140.75 10.0352 140.75 11.4258C142.695 11.2148 144.453 10.9922 146.023 10.7578C146.07 10.4766 146.094 10.207 146.094 9.94922Z"
                fill={color}
            />
        </svg>
    );
};

Logo.defaultProps = {
    color: "#2FD2DC",
};

export default Logo;
