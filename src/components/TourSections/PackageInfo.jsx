import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function PackageInfo({ tourData }) {
    return <div className="packageWrapper">
        <h3>What’s inside the package?</h3>
        <div className="package">
            <div className="inclusion">
                <h5>Inclusions</h5>
                <div className="packageInfo">
                    {
                        tourData?.inclusion?.map((inc, incIndex) => {
                            if (inc !== "") {
                                return <div className="info" key={incIndex}>
                                    <div className="signImg">
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                    </div>
                                    <div>{inc}</div>
                                </div>
                            }
                            
                        })
                    }
                </div>
            </div>
            <div className="vrLine" />
            <div className="exclusion">
                <h5>Exclusions</h5>
                <div className="packageInfo">
                    {
                        tourData?.exclusion?.map((exc, excIndex) => {
                            return <div className="info" key={excIndex}>
                                <div className="signImg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                    >
                                        <path
                                            d="M13.3346 13.3327L2.66797 2.66602M13.3346 2.66602L2.66797 13.3327"
                                            stroke="#FF1A1A"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                                <div>{exc}</div>
                            </div>
                        })
                    }
                    
                </div>
            </div>
        </div>
    </div>
}

PackageInfo.propTypes = {
    tourData: PropTypes.object.isRequired,
};