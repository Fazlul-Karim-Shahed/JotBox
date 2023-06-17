import React, { useRef, useState } from 'react';
import './Test.css';

export default function Test() {
    const [isLeftDragging, setIsLeftDragging] = useState(false);
    const [isRightDragging, setIsRightDragging] = useState(false);
    const pageRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    function resetColumnSizes() {
        // when page resizes return to default col sizes
        pageRef.current.style.gridTemplateColumns = '2fr 6px 6fr 6px 2fr';
    }

    function setCursor(cursor) {
        pageRef.current.style.cursor = cursor;
    }

    function startLeftDrag() {
        console.log('mouse down');
        setIsLeftDragging(true);
        setCursor('ew-resize');
    }

    function startRightDrag() {
        console.log('mouse down');
        setIsRightDragging(true);
        setCursor('ew-resize');
    }

    function endDrag() {
        console.log('mouse up');
        setIsLeftDragging(false);
        setIsRightDragging(false);
        setCursor('auto');
    }

    function onDrag(event) {
        if (isLeftDragging || isRightDragging) {
            console.log('Dragging');

            const page = pageRef.current;
            const leftcol = leftColRef.current;
            const rightcol = rightColRef.current;

            const leftColWidth = isLeftDragging ? event.clientX : leftcol.clientWidth;
            const rightColWidth = isRightDragging
                ? page.clientWidth - event.clientX
                : rightcol.clientWidth;

            const dragbarWidth = 6;

            const cols = [
                leftColWidth,
                dragbarWidth,
                page.clientWidth - 2 * dragbarWidth - leftColWidth - rightColWidth,
                dragbarWidth,
                rightColWidth,
            ];

            const newColDefn = cols.map((c) => c.toString() + 'px').join(' ');

            console.log(newColDefn);
            page.style.gridTemplateColumns = newColDefn;

            event.preventDefault();
        }
    }

    return (
        <div onResize={resetColumnSizes}>
            <div
                id="page"
                ref={pageRef}
                onMouseUp={endDrag}
                onMouseMove={onDrag}
            >
                <div id="leftcol" ref={leftColRef}>
                    Left Col
                </div>
                <div id="leftdragbar" onMouseDown={startLeftDrag}></div>
                <div id="tabpages">Tab Pages
                <br />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est voluptatum quos voluptates, fugiat tempore hic iure, non voluptatem repellat impedit dolor dolorum repudiandae nostrum delectus vitae perspiciatis. Nihil fuga beatae eveniet molestiae iure magnam nobis iste harum facilis, eligendi dolorum quibusdam adipisci minima! Quibusdam rem eum animi dicta, maxime ad quos quam aliquam quaerat sed commodi tempora error architecto id, cumque nam nostrum corrupti, minus impedit omnis hic qui cupiditate? Facere aperiam explicabo saepe, aliquid, nesciunt ut accusantium exercitationem laudantium atque possimus deleniti quasi, officia fugiat eaque obcaecati odit eligendi quas facilis eius nemo ipsa cumque esse optio! Voluptas ipsa molestias libero ab eaque molestiae adipisci possimus dolorem vel, nihil vero quidem impedit, exercitationem omnis natus, laborum dolorum earum. Animi, illo voluptate? Ipsam in temporibus mollitia voluptas impedit, molestiae voluptatum, vel consequatur dolorem cupiditate quibusdam sint quaerat quas obcaecati pariatur, quos autem velit quasi quae vero dignissimos facere ullam. Fuga corporis cupiditate veritatis soluta est sit ut cum nobis accusantium commodi. Odit expedita itaque laborum iure, dicta temporibus voluptatibus maiores, incidunt dolorum quibusdam et nihil minus sit similique laboriosam illum eaque quae ea nisi! Delectus officia sunt natus quidem harum aspernatur asperiores voluptatibus maiores ex, nihil eius tempore in est totam esse nisi voluptate tenetur! Voluptatibus, nihil iusto. Deleniti quo cum tempore soluta doloribus eveniet optio reprehenderit, beatae consequuntur odit accusantium laudantium quaerat quia facilis inventore dolorem, sequi nostrum vitae qui maiores earum accusamus fuga! Unde provident totam officiis? Et obcaecati, neque aliquid quae unde sapiente harum, ratione nihil tempora exercitationem quam a perferendis consectetur est sit assumenda nisi atque rerum enim nam minus? Illo iusto necessitatibus minus facere distinctio facilis aliquam sed, dignissimos, quisquam inventore corrupti quibusdam eligendi eos quos laboriosam! Neque obcaecati quaerat minima reprehenderit, nam voluptatum earum quam cum sapiente blanditiis suscipit recusandae distinctio qui laborum necessitatibus culpa possimus autem beatae quasi. Minus voluptatem ut magni culpa quidem. Nesciunt ut officiis deleniti, est eveniet id nulla quisquam iste ea recusandae sed obcaecati corporis, temporibus sit, qui eaque dicta iure facere pariatur illo aperiam numquam non! Commodi repudiandae perferendis itaque iure consequatur molestias harum odio natus pariatur, error aliquid nesciunt aut suscipit eum ullam libero eaque facilis est doloremque necessitatibus! Error voluptates ratione quia autem dolore repellendus sunt voluptate, animi, a corrupti perspiciatis cupiditate vitae unde. Nihil sed repellat vero magnam suscipit asperiores aut, harum quis! Voluptatum natus, ipsa facilis perferendis vitae esse fuga laborum veniam quisquam culpa quos ad ab consequuntur distinctio, et laboriosam delectus minus dolorum, quibusdam sit? Fugit adipisci eum aspernatur magnam. Quod odit consequatur quos deserunt doloribus fugiat. Maxime facere magni ut delectus quam dignissimos doloribus laudantium optio alias, voluptas aperiam voluptates, sunt soluta distinctio non! Nemo magni quae, itaque similique enim fuga veniam quia laborum. Porro iusto nemo vitae voluptate molestias ducimus, perferendis earum culpa? Odit ut voluptatibus inventore, itaque distinctio voluptates quod eos veritatis, ipsum similique ipsam vero atque nostrum! Autem at quae impedit dolores, vel dicta deserunt accusantium. Culpa illum eum officiis blanditiis placeat odio consequatur mollitia doloremque quia beatae officia dignissimos maiores fugit illo ab libero praesentium dicta sint pariatur facere, aliquam nostrum ullam obcaecati quo! Nulla atque, molestiae nisi in error suscipit doloribus, impedit sint deserunt exercitationem ullam officia! Adipisci vitae unde, numquam optio culpa tempora temporibus atque ad enim eligendi magni sed, suscipit modi deleniti saepe! Suscipit alias maiores, ea eos accusamus, voluptates error ab id et voluptas quasi temporibus itaque, at eligendi vero. Mollitia nobis, provident eius, inventore eaque animi eum incidunt officiis enim deserunt nostrum ab. Esse commodi cupiditate, deleniti nostrum, eligendi eaque amet, asperiores dolore facilis doloremque corrupti! Temporibus, dicta quasi! Fuga deserunt fugiat eum iusto obcaecati! Animi, nostrum eum veniam illo eveniet a, sequi sunt veritatis, ad doloribus minus doloremque quae impedit? Deleniti dolor adipisci magni accusamus esse incidunt illum ad ipsam suscipit dolore quo maxime fuga officiis dolores, in, molestiae dignissimos rem architecto itaque unde! Debitis earum eum corrupti architecto aliquid, tenetur optio laborum aliquam laudantium ut aperiam nemo aut voluptatibus. Nisi magni delectus, rem voluptatum explicabo sunt doloribus minus iusto ipsum harum nostrum blanditiis hic eum aliquid nihil alias consequatur laborum quidem ea pariatur. Omnis sapiente pariatur quia ipsum odio ipsa consequuntur? Aperiam ipsum repellat commodi ullam, distinctio nulla illo corporis impedit eveniet ad! Nobis, perspiciatis fugit sunt saepe architecto, dolor dolore velit libero, maiores magnam est. Amet pariatur eos vero id natus, quibusdam voluptate quidem modi dicta ab sed perferendis reprehenderit, ipsam aperiam vel aliquid praesentium inventore. Totam veniam debitis ullam mollitia odio deserunt vero, alias corporis sequi culpa soluta, similique, ipsum ipsa sapiente sit itaque sunt inventore repellendus modi quia commodi. In laborum nisi ab corrupti quae enim reprehenderit ipsa debitis voluptate officia temporibus, minima porro fugit voluptatibus laboriosam facilis cum necessitatibus soluta. Eveniet quas quod sunt quae! A sed amet, quae nostrum quo dolores alias quibusdam consectetur quos modi laboriosam maiores ad atque? Fugit voluptate voluptas minus velit nesciunt necessitatibus officia, unde accusantium nisi quos, corrupti excepturi iusto quia? Dignissimos cupiditate rem in incidunt laudantium eligendi ullam necessitatibus accusamus, ducimus id cumque tempore. Minima qui tempore iste aliquid dolores, rerum odit quo alias! Blanditiis beatae quod in. Minima obcaecati, ad eligendi debitis voluptates asperiores cumque aperiam similique vitae, libero dignissimos sit recusandae ea amet dolores! Dolorum modi facere quibusdam numquam! Ducimus, atque eius? Id debitis quos non velit sint voluptate tempore numquam dolores consequatur blanditiis aut perferendis autem officiis deserunt aperiam corrupti a necessitatibus reprehenderit corporis, delectus dignissimos? Incidunt, laudantium vero atque similique doloribus a voluptatum tempore ipsum asperiores explicabo culpa nemo enim numquam! Labore facilis eos nesciunt doloremque ab dolorem modi sunt, accusantium aperiam corporis laudantium provident deserunt culpa deleniti. Repellendus optio voluptatum soluta dolorum at sint iusto ipsam ab ratione odit earum numquam, eius architecto perspiciatis explicabo ea recusandae? Harum, ex labore, tempora neque nemo molestiae laborum necessitatibus praesentium omnis, qui corporis dolorum quod. Atque perspiciatis deserunt minus recusandae natus ducimus, ullam velit nobis laborum, nostrum cumque et non iusto sapiente numquam amet sunt voluptatum mollitia unde veniam fugit quibusdam! Repudiandae deleniti, eaque corporis sed nemo odit modi delectus ex architecto expedita, sequi necessitatibus tempore ad corrupti laudantium illum velit asperiores dolorem quo! Magnam molestias non reiciendis, placeat recusandae porro quam optio deleniti quasi ut odio esse natus impedit neque ad temporibus! Harum, est hic illum, repudiandae dolor, adipisci vel dolorem quae eligendi cum culpa necessitatibus sit dolore quasi excepturi! Ullam corporis, illum cumque iure saepe odio eos debitis! Enim dicta magnam neque error assumenda omnis, reprehenderit dolorem blanditiis quod tempora? Excepturi, veritatis est odio quibusdam sapiente molestiae beatae voluptatum quaerat. Assumenda itaque quo id nesciunt voluptatem, repellendus quam facilis qui illo culpa quidem, magni porro in incidunt accusantium sequi quasi pariatur facere impedit ad sapiente quis quod. Possimus natus nesciunt delectus harum sequi ex accusantium, ut cum repellat id voluptatem architecto nam dignissimos magni libero aut similique quos aperiam officia quisquam asperiores ab molestiae. Vero dolorum ducimus, mollitia eaque atque libero quos, laborum distinctio recusandae aut, autem inventore? Mollitia nobis excepturi praesentium accusamus, nisi animi laborum delectus vel, neque dolorem beatae nihil porro reprehenderit nemo deserunt. Necessitatibus ipsum ratione cumque esse est alias magni sint quam unde assumenda corrupti fugiat omnis incidunt, iste tenetur mollitia fugit adipisci asperiores delectus numquam voluptatibus ea maxime inventore. Iste, in. Odit, veritatis hic assumenda, rem vero similique, sunt numquam dolor nesciunt fugit totam quidem quo illum dolorem aperiam doloribus quae nulla. Illum sit molestiae expedita. Enim, aut alias? Debitis maxime ipsa officiis, id possimus quod veritatis eos velit eaque deleniti error. Voluptas, soluta. Repellendus quia maiores dolore reprehenderit beatae voluptates fuga sint, voluptate sapiente officia excepturi quidem dolorem exercitationem ratione delectus! Labore, eaque? Similique, fugiat, dolor dolore dignissimos ullam minima est nihil nam amet illum quia excepturi sequi, sapiente ex reiciendis? Mollitia consequatur libero tempore minus asperiores corrupti nemo aspernatur qui porro! Praesentium necessitatibus ipsa nam, dolores magni voluptatem? Consectetur eaque exercitationem quod eum eius suscipit, reprehenderit tempore doloremque qui at? Facilis nemo neque earum sit facere, voluptates eligendi doloribus porro nulla perspiciatis ex? Praesentium nihil ad soluta, adipisci omnis, eos odit facilis iste corporis excepturi explicabo vel inventore. Veniam eveniet ab beatae tenetur amet, sed perferendis architecto voluptatem, corporis est saepe molestiae maiores libero totam aspernatur deserunt fugit voluptatum reiciendis minima labore, dolorum iusto doloremque esse. Aut, sed provident odio molestias error voluptate quis pariatur blanditiis vero quam amet vitae quia incidunt placeat, deleniti nesciunt. Possimus, unde corporis provident maiores explicabo est eius facilis dolorem ut laudantium deleniti corrupti nemo ea laborum molestiae quo eveniet. Nam similique tempore sequi quidem, ducimus explicabo. Recusandae eaque corporis fuga ducimus architecto, illum, excepturi quos eligendi est reiciendis iusto nam doloremque? Aliquam hic ipsum asperiores odio fuga qui explicabo sed possimus cum corporis debitis id quasi dicta voluptatem obcaecati temporibus, minus officia eos illum commodi. Quibusdam minus, voluptatibus illum eum amet eaque assumenda odio, blanditiis maxime magni veniam quisquam eius ut delectus nisi praesentium reiciendis aliquam voluptates totam doloribus facilis repellat vitae sunt. Quidem ipsa corporis cum nostrum soluta eligendi illum! Ratione beatae sed totam facilis neque dolores magni ullam ut impedit deleniti numquam optio, hic fuga aliquam nesciunt. Aut, voluptatum incidunt! Consequuntur repudiandae numquam, ex, explicabo animi temporibus voluptatem vitae id in facere tempore dolor aliquid. Earum architecto dicta magni consequatur aspernatur sequi at reprehenderit doloribus, saepe, sunt rem totam modi ut soluta atque minima, ex non recusandae provident dolor quidem inventore temporibus vel pariatur. Rerum quisquam quos vero, eum eius earum unde corporis voluptatem officiis. Dolore pariatur consectetur aliquid quasi odio quia ullam aspernatur quis quos explicabo? Eius et consequuntur cum nulla molestiae aspernatur exercitationem corporis veritatis tempora commodi, quia quam ab libero nobis eveniet reprehenderit, mollitia nesciunt odio. Ratione iusto, incidunt illo atque at recusandae quidem ut dolorum aut, natus itaque laboriosam minima magnam dignissimos dolore architecto necessitatibus eaque? Expedita quod quae vel, dolore temporibus ea nesciunt dolor aperiam! Qui quibusdam iusto mollitia exercitationem perspiciatis expedita sapiente officiis assumenda molestias illo eveniet ducimus quod tempore rem eligendi nisi recusandae, dicta porro aut atque esse sint. Repellat eaque, est assumenda tempora aliquam veritatis nisi itaque aut libero eos, ad, sint minus. Ullam veniam quam iusto tempora vel assumenda dolorum aliquam nostrum magnam, sint consectetur ad quidem at nemo provident magni repudiandae velit blanditiis doloremque distinctio ipsam! Sint, illo labore! Mollitia, nobis quos voluptates pariatur maiores odio nesciunt delectus dolore accusantium laboriosam, aspernatur voluptatem similique, totam enim deleniti voluptas necessitatibus distinctio asperiores est ratione sit vitae? Provident voluptates, suscipit temporibus a sunt quibusdam blanditiis illum exercitationem aut magni deserunt error voluptas eveniet minima recusandae quo eaque. Ut ea, voluptatem praesentium laborum, dolor quam ducimus id assumenda eveniet maiores veniam aliquam. Nam iusto optio ipsam aliquid cum aperiam dolorum nesciunt. Consequuntur voluptatum soluta nam necessitatibus. Dolorem et maiores sint commodi incidunt? Doloribus, rerum. Reprehenderit corrupti accusamus architecto eveniet impedit libero. Expedita, illo, ducimus, explicabo quisquam quidem magni harum placeat ipsa sit eveniet dolor deleniti nesciunt quibusdam numquam! Sed, culpa ex id earum, at corrupti quibusdam deleniti distinctio, quas excepturi numquam quia possimus ratione vero fuga nam autem labore error laudantium illo enim quaerat. Corrupti ad libero porro earum quasi cumque totam aliquid harum esse temporibus placeat sint, labore explicabo velit non tempora eligendi ullam. Aliquam recusandae provident delectus maxime tempore necessitatibus qui, dolorum ex explicabo voluptatem harum? Nam fugiat molestias eos ducimus est ad nulla molestiae vero cum earum fuga praesentium harum laborum expedita repellendus consequuntur ullam atque alias, excepturi nesciunt nobis fugit eveniet voluptas. Distinctio nesciunt fuga quasi, iure atque ab ratione nulla illum numquam est dignissimos natus, corrupti velit voluptatem nostrum neque reprehenderit? Quo quidem perspiciatis ipsa. Cum reiciendis vitae sapiente perspiciatis, illum non corporis. Aut placeat magni doloribus, eveniet provident ea nemo voluptate repellat magnam optio beatae dignissimos? Consectetur doloremque incidunt sapiente earum, tempora veritatis consequatur aspernatur placeat ex recusandae quas adipisci nihil debitis asperiores libero non perspiciatis unde dolores ratione, qui, eveniet amet provident quia? Blanditiis quia obcaecati neque asperiores, corporis aperiam fuga itaque, maxime aliquid quis veritatis tempore! Debitis aperiam consequatur facere sunt, molestiae commodi impedit qui veniam quam nam incidunt odit esse quaerat aliquid. At, optio! Nam.
                </div>
                <div id="rightdragbar" onMouseDown={startRightDrag}></div>
                <div id="rightcol" ref={rightColRef}>
                    Rightcol
                    <br />
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam cupiditate sed earum repudiandae alias ullam, incidunt molestias, temporibus, nostrum voluptatem dignissimos repellendus numquam esse eveniet labore quis eum? Fugiat fuga maxime, at dolorum quo ipsa doloremque delectus ut alias! Vel labore soluta reiciendis, autem fugit sapiente aliquam aperiam ea ullam cum id dignissimos ut perspiciatis eius tempora. Accusamus quia expedita praesentium, quod magnam nemo sit, dolorum natus illum recusandae accusantium at aut, iste consequatur labore. Architecto explicabo, libero praesentium rerum facilis iste, est velit incidunt deleniti numquam similique sapiente laboriosam cum temporibus dolorem quasi dolore modi culpa quo, consequuntur unde ipsa provident. Quia soluta vero eum quod labore sequi distinctio iusto cupiditate, at a dolorem asperiores laudantium quis saepe pariatur officiis, ut modi aliquam animi esse, magni laboriosam consectetur? Impedit reprehenderit dolores rem libero magni ab cupiditate ad, praesentium quod dolorem corrupti accusamus assumenda laborum beatae sed vel suscipit sint, minima repellat est odio expedita exercitationem. Eum maiores molestias ullam, aliquid nobis officiis eveniet mollitia fugit, culpa, excepturi numquam tempora maxime quidem eligendi eaque. Consequuntur earum rerum harum blanditiis ipsa, adipisci quidem magnam fugit sequi distinctio. Eos dolor earum consectetur officiis doloremque culpa quaerat distinctio eum voluptas minus? Veritatis nemo quas maiores repellendus fuga incidunt ea similique commodi laborum beatae, blanditiis voluptatum natus illum ducimus aperiam delectus quam! Necessitatibus earum beatae eius suscipit culpa, facilis id quae maiores dolorum mollitia eos saepe libero tempore voluptatibus placeat labore consectetur! At blanditiis soluta mollitia, a ipsam hic maiores accusantium vero consequuntur accusamus atque aliquid voluptas sapiente, iure tempore rerum modi sit id cupiditate maxime placeat harum incidunt? Sapiente, natus numquam, tempora tempore veniam suscipit nisi nam odio perspiciatis reiciendis minima dignissimos perferendis laboriosam aliquid et aspernatur neque eaque vitae? Obcaecati non autem unde doloribus saepe dolor at sit. Numquam, iusto corrupti. Recusandae!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos eaque repudiandae sit accusantium, debitis quia tempora animi. Culpa id voluptatum doloremque iusto. Modi vel, beatae quaerat dolor tenetur error recusandae! Qui minus libero repellat modi sunt aut perferendis accusantium consequatur, aperiam quasi laboriosam aliquid deleniti esse. Veniam magni explicabo iste perspiciatis totam tenetur sunt voluptatibus dolores, molestias laboriosam dolorem odio. Excepturi ipsa sapiente natus vero pariatur aspernatur, ea recusandae aperiam placeat nemo labore maiores magni minima inventore assumenda nostrum optio vitae, quidem doloribus animi illo neque? Repellat in dicta hic laudantium earum nihil rerum quo quibusdam quasi obcaecati amet atque sapiente incidunt, assumenda, error, dolorem qui aspernatur laborum recusandae. Quos quo, recusandae suscipit, illo vel vero alias molestiae magni sit porro minus ipsam delectus? Esse nisi incidunt magni laborum mollitia, vero ducimus! Atque quod laboriosam repellendus reiciendis ad officiis doloribus! Dolor recusandae consequuntur vitae omnis expedita reiciendis voluptatibus voluptatem, saepe officiis ducimus similique repellat veniam eius eum ea magni libero quas quos, quae animi ipsam ipsum. Dolor natus inventore consequuntur similique expedita soluta officiis facilis ipsum corrupti dolorem, necessitatibus iure, sed nulla a voluptas vel dicta error qui earum! Eos distinctio hic, recusandae tenetur maxime eveniet corporis commodi, debitis natus velit laboriosam quae eaque quod. Nam totam tempore suscipit neque labore tenetur ipsa aspernatur recusandae officia odit accusamus voluptatum numquam voluptatibus obcaecati sapiente quam laborum similique velit, ullam officiis dignissimos! A vitae delectus veritatis nostrum quia vero consequatur dignissimos, deleniti doloribus quae dolor reiciendis numquam, eius aliquam eveniet itaque molestiae, voluptatum ab recusandae! Natus labore deleniti deserunt distinctio maiores! Soluta architecto aliquam consectetur natus ad dolorum molestiae quasi eius? Magnam, rem nam qui hic sapiente ducimus ut nisi natus illo quam doloribus nulla maxime nihil quisquam, recusandae, a quaerat rerum. Beatae qui magni, repellat harum repudiandae nam quod eum alias quia iusto accusantium, expedita officiis esse dignissimos ipsam deleniti labore non explicabo! Obcaecati exercitationem earum ad excepturi distinctio doloribus, inventore ducimus autem pariatur id libero sapiente iste perspiciatis impedit nobis sunt amet ipsa placeat aliquam esse dolorem laudantium laboriosam voluptates! Voluptas molestiae eveniet esse enim tenetur quasi repudiandae quod praesentium voluptatibus iste, laudantium maiores itaque qui hic! Iusto, aspernatur? Sint voluptatem quibusdam iste error illo dolores, ad voluptatum, ratione alias facilis sit consequatur reiciendis corrupti deserunt dolorum nihil nisi. Aspernatur quas fuga qui in distinctio, nobis eaque tenetur quaerat eum pariatur! Ex, maiores assumenda cupiditate, soluta reiciendis repellendus tempora qui, voluptatem velit deserunt rem delectus odio quidem temporibus eveniet laboriosam vero doloremque veniam voluptatibus similique illo harum omnis accusamus! Nam quo, eaque harum, porro aspernatur voluptatem, unde consectetur amet placeat maiores doloribus tempora necessitatibus incidunt repellendus similique vitae ut nobis animi veritatis deleniti repudiandae reprehenderit voluptatibus! Nihil assumenda nobis, doloribus accusamus consequuntur libero veritatis molestiae reprehenderit cupiditate quod quas quaerat repellat accusantium unde possimus commodi. Minus perspiciatis voluptatem aliquid libero facilis veritatis sint adipisci fugiat rem iusto. A vel aperiam animi voluptas ratione inventore ex corporis repellendus, maiores fugiat doloribus vitae blanditiis eos sint repellat iusto laboriosam? Odio, veniam ex. Maiores deleniti, qui enim voluptatem dolorum eligendi temporibus cupiditate asperiores ad unde eius officia non suscipit optio aspernatur vero error ducimus voluptate! Maxime veniam a quis in nisi ullam incidunt quisquam ipsum. Nulla, vero culpa? Dolorem ipsa rerum optio error, consequuntur odio, hic quis alias possimus, accusamus modi? Facere modi a quidem recusandae labore natus, molestiae quo vitae illum, incidunt suscipit impedit nesciunt repudiandae error possimus rerum voluptatibus voluptatem, ipsam laborum eum magni odit deserunt. Est temporibus voluptatum illo omnis voluptates perspiciatis optio, saepe, magnam pariatur ipsa aut quaerat quasi mollitia modi! A unde omnis eius suscipit voluptatibus? Ea rem maiores nisi reprehenderit accusantium sit excepturi tempora, animi nam, quidem quod ipsa asperiores recusandae dolores modi sed ratione consequatur magni libero illo eum. Est quia nisi vero labore omnis impedit, aspernatur delectus illum, dolore eligendi maiores id, rem eveniet quo nesciunt quasi nemo iste voluptas. Quasi voluptatem ea accusantium doloribus dicta dolor sequi aut necessitatibus ad fuga nulla labore exercitationem totam nesciunt impedit, delectus reiciendis eos, sunt quibusdam laboriosam? Necessitatibus similique nemo dolores accusantium iste earum vero saepe architecto, consectetur ea, qui ipsam cumque tempora deserunt, ad beatae aut libero ipsa fugiat. Obcaecati quae voluptate eum recusandae, quisquam ea eligendi nesciunt animi necessitatibus odio itaque consequuntur quidem debitis, deleniti voluptatum vitae? Aliquam dolore sed tempora alias voluptas vel ut, impedit fugit laboriosam corrupti ipsum est cumque porro eos sit. Necessitatibus vitae repudiandae fugit assumenda fugiat sunt, eum ab nam voluptatum alias in placeat ipsum ipsam non amet nobis natus dolorum culpa nihil harum? Perspiciatis dignissimos aliquid, maxime maiores neque laudantium ab autem, placeat voluptatibus illum blanditiis iste animi expedita unde obcaecati magnam atque officiis dolores error doloribus voluptates recusandae quae aut. Ea et expedita quas facilis aperiam obcaecati pariatur sed magni laboriosam iusto cupiditate, corrupti dicta aspernatur distinctio voluptatibus vero itaque mollitia optio natus illum provident molestias quae. Ratione perferendis ad a inventore, aliquid ipsam sapiente aperiam ipsum omnis est voluptate pariatur nobis laborum error vel ex cum nostrum molestiae? Inventore mollitia sapiente eum iste natus dicta velit, explicabo ad accusamus harum voluptate, rerum modi suscipit ipsa fuga maiores vitae, cum blanditiis quibusdam accusantium. Nihil mollitia esse perferendis quam sequi laborum fuga aliquid laboriosam provident praesentium! Ipsum possimus magni corporis iusto! Cum id asperiores laboriosam perferendis atque esse commodi ab, odit quis veritatis consectetur minus ipsa velit aut repudiandae ipsam laudantium fugit repellendus laborum facere, temporibus saepe expedita, vel placeat. Ratione voluptas, culpa officia architecto earum aliquid mollitia fugit vitae quaerat, nam et? Voluptate repellat, exercitationem mollitia laborum accusantium, ad possimus sunt delectus placeat ex illum quisquam blanditiis consequatur, vel tenetur itaque ipsa ipsam praesentium nesciunt. Praesentium sapiente, impedit officiis sunt assumenda, accusamus nostrum ducimus velit inventore doloribus earum ad, libero perspiciatis! Necessitatibus dolores repellat esse exercitationem maiores saepe, nihil recusandae magnam, laborum excepturi eaque ducimus et doloribus quas consequuntur alias. Corrupti et natus dolorem quas, vero voluptatum deserunt, iste ea architecto iusto, dicta sint deleniti itaque magni odio consequuntur dignissimos assumenda? Inventore eius quae quos fugiat architecto esse!
                </div>
            </div>
        </div>
    );
}
