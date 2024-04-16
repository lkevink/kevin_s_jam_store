import React from 'react'
import FooterModuleCss from './css/Footer.module.css'

export default function Footer() {

    const currentYear = new Date().getFullYear();
    
    return (
        <div>
            <footer>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tfoot>
                        <tr>
                            <td style={{  color: 'white', textAlign: 'center' }} colSpan="2">
                            &copy; {currentYear} Kevin's Jam Store
                            </td>
                            
                        </tr>
                    </tfoot>
                </table>
            </footer>
        </div>
    )
}
