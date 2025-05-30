export async function getServerSideProps() {
  const res = await fetch("https://api.fullontravel.com/api/tour/footer-link");
  const footerLink = await res.json();
  return footerLink;
}
import Link from "next/link";
export default async function AfterFooter() {
  const FooterLinks = await getServerSideProps();
  return (
    <div className="afterFooter">
      <div className="customContainer">
        {FooterLinks?.map((links, index) => {
          return (
            links?.active && (
              <div className="afterFooter-wrapper" key={index}>
                <div className="titleAfterfooter">{links?.title}</div>
                <div className="linksWrapper">
                  <ul>
                    {[...(links?.footerLinkItem || [])]
                      ?.sort((a, b) => a.name.localeCompare(b.name))
                      ?.map((footerLink, index) => (
                        <li key={index}>
                          <Link href={footerLink?.url}>{footerLink?.name}</Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
